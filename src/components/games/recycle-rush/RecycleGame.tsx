import { useState, useEffect, useCallback, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

// Import game item images
import trashBag from '@/assets/game-items/trash-bag.png';
import pizzaSlice from '@/assets/game-items/pizza-slice.png';
import bananaPeel from '@/assets/game-items/banana-peel.png';
import sodaCup from '@/assets/game-items/soda-cup.png';
import popcorn from '@/assets/game-items/popcorn.png';
import newspaper from '@/assets/game-items/newspaper.png';
import paper from '@/assets/game-items/paper.png';
import clipboard from '@/assets/game-items/clipboard.png';
import chart from '@/assets/game-items/chart.png';
import graph from '@/assets/game-items/graph.png';
import recycleBin from '@/assets/game-items/recycle-bin.png';

interface GameObject {
  id: number;
  x: number;
  y: number;
  type: 'trash' | 'recyclable';
  item: string;
  speed: number;
  rotation: number;
}

interface PlayerBin {
  x: number;
  width: number;
  height: number;
}

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;
const BIN_WIDTH = 80;
const BIN_HEIGHT = 60;
const OBJECT_SIZE = 40;

const TRASH_ITEMS = [trashBag, pizzaSlice, bananaPeel, sodaCup, popcorn];
const RECYCLABLE_ITEMS = [newspaper, paper, clipboard, chart, graph];

export const RecycleGame = () => {
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'paused' | 'gameOver' | 'victory'>('menu');
  const [score, setScore] = useState(0);
  const [objects, setObjects] = useState<GameObject[]>([]);
  const [playerBin, setPlayerBin] = useState<PlayerBin>({
    x: GAME_WIDTH / 2 - BIN_WIDTH / 2,
    width: BIN_WIDTH,
    height: BIN_HEIGHT,
  });
  const [binSpeed, setBinSpeed] = useState(10);
  const [keys, setKeys] = useState<{ [key: string]: boolean }>({});
  const [scoreAnimation, setScoreAnimation] = useState('');
  const [lastCatchPosition, setLastCatchPosition] = useState(GAME_WIDTH / 2);
  const [nextObjectChain, setNextObjectChain] = useState<{ x: number; timing: number } | null>(null);
  
  const gameLoopRef = useRef<number>();
  const objectIdRef = useRef(0);
  const spawnTimeRef = useRef(0);
  const difficultyRef = useRef({ baseSpeed: 1.2, spawnDelay: 2000, chainBuffer: 0.8 });

  // Keyboard handling
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setKeys(prev => ({ ...prev, [e.code]: true }));
      
      if (e.code === 'Space') {
        e.preventDefault();
        if (gameState === 'playing') {
          setGameState('paused');
        } else if (gameState === 'paused') {
          setGameState('playing');
        }
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      setKeys(prev => ({ ...prev, [e.code]: false }));
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameState]);

  // Player movement
  useEffect(() => {
    const movePlayer = () => {
      if (gameState !== 'playing') return;
      
      setPlayerBin(prev => {
        let newX = prev.x;
        if (keys['ArrowLeft'] && prev.x > 0) {
          newX = Math.max(0, prev.x - binSpeed);
        }
        if (keys['ArrowRight'] && prev.x < GAME_WIDTH - BIN_WIDTH) {
          newX = Math.min(GAME_WIDTH - BIN_WIDTH, prev.x + binSpeed);
        }
        return { ...prev, x: newX };
      });
    };

    const interval = setInterval(movePlayer, 16); // ~60fps
    return () => clearInterval(interval);
  }, [keys, gameState, binSpeed]);

  // Calculate strategic object spawn position and timing
  const calculateNextSpawn = useCallback((currentPlayerX: number, lastCatchX: number) => {
    const difficulty = difficultyRef.current;
    const playerCenterX = currentPlayerX + BIN_WIDTH / 2;
    
    // Calculate maximum travel distance player can make
    const maxTravelDistance = GAME_WIDTH - BIN_WIDTH;
    const playerSpeed = binSpeed;
    
    // Medium difficulty: objects should be catchable but require movement
    const minDistanceFromPlayer = BIN_WIDTH * 1.5; // Must move at least 1.5 bin widths
    const maxDistanceFromPlayer = maxTravelDistance * 0.7; // Don't make it too far
    
    // Calculate target X position
    let targetX: number;
    const distanceFromLast = Math.random() * (maxDistanceFromPlayer - minDistanceFromPlayer) + minDistanceFromPlayer;
    
    // Alternate sides to create strategic movement
    if (Math.random() > 0.5) {
      targetX = Math.max(0, Math.min(GAME_WIDTH - OBJECT_SIZE, lastCatchX + distanceFromLast));
    } else {
      targetX = Math.max(0, Math.min(GAME_WIDTH - OBJECT_SIZE, lastCatchX - distanceFromLast));
    }
    
    // Calculate required travel time for player
    const travelDistance = Math.abs(playerCenterX - (targetX + OBJECT_SIZE / 2));
    const requiredTravelTime = travelDistance / playerSpeed;
    
    // Calculate object fall time (should be longer than travel time + buffer)
    const bufferTime = difficulty.chainBuffer; // seconds buffer
    const minFallTime = (requiredTravelTime / 60) + bufferTime; // convert frames to seconds
    const objectSpeed = Math.max(difficulty.baseSpeed, GAME_HEIGHT / (minFallTime * 60)); // ensure reachable
    
    return {
      x: targetX,
      speed: Math.min(objectSpeed, difficulty.baseSpeed + 1.5), // cap max speed
      timing: minFallTime
    };
  }, [binSpeed]);

  // Spawn objects with strategic positioning
  const spawnObject = useCallback(() => {
    const isTrash = Math.random() > 0.4; // 60% trash, 40% recyclable
    const items = isTrash ? TRASH_ITEMS : RECYCLABLE_ITEMS;
    const item = items[Math.floor(Math.random() * items.length)];
    
    // Calculate strategic position
    const currentPlayerX = playerBin.x;
    const spawnCalc = calculateNextSpawn(currentPlayerX, lastCatchPosition);
    
    const newObject: GameObject = {
      id: objectIdRef.current++,
      x: spawnCalc.x,
      y: -OBJECT_SIZE,
      type: isTrash ? 'trash' : 'recyclable',
      item,
      speed: spawnCalc.speed,
      rotation: 0,
    };
    
    // Update chain for next spawn
    setNextObjectChain({
      x: spawnCalc.x + OBJECT_SIZE / 2,
      timing: spawnCalc.timing
    });
    
    setObjects(prev => [...prev, newObject]);
  }, [calculateNextSpawn, lastCatchPosition, playerBin.x]);

  // Collision detection
  const checkCollision = useCallback((obj: GameObject, bin: PlayerBin) => {
    return (
      obj.x < bin.x + bin.width &&
      obj.x + OBJECT_SIZE > bin.x &&
      obj.y < GAME_HEIGHT - bin.height &&
      obj.y + OBJECT_SIZE > GAME_HEIGHT - bin.height
    );
  }, []);

  // Game loop
  useEffect(() => {
    if (gameState !== 'playing') {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
      return;
    }

    const gameLoop = () => {
      const currentTime = Date.now();
      
      // Check for victory condition
      if (score >= 150) {
        setGameState('victory');
        toast.success('🎉 Victory! You reached 150 points!');
        return;
      }

      // Spawn objects with strategic timing
      if (currentTime - spawnTimeRef.current > difficultyRef.current.spawnDelay) {
        spawnObject();
        spawnTimeRef.current = currentTime;
      }

      // Update objects
      setObjects(prev => {
        const updatedObjects = prev.map(obj => ({
          ...obj,
          y: obj.y + obj.speed,
          rotation: obj.rotation + 2,
        }));

        // Check collisions and handle scoring
        updatedObjects.forEach(obj => {
          if (checkCollision(obj, playerBin)) {
            // Update last catch position for strategic spawning
            setLastCatchPosition(obj.x + OBJECT_SIZE / 2);
            
            if (obj.type === 'trash') {
              setScore(s => s + 10);
              setScoreAnimation('pulse-success');
              toast.success(`+10 points! Great catch!`);
              
              // Increase difficulty every 50 points
              if ((score + 10) % 50 === 0) {
                const newDifficulty = difficultyRef.current;
                if (binSpeed < 16) {
                  setBinSpeed(prev => prev + 1);
                  toast.success(`🚀 Bin speed increased to ${binSpeed + 1}!`);
                }
                // Increase object speed and reduce spawn delay
                newDifficulty.baseSpeed = Math.min(2.5, newDifficulty.baseSpeed + 0.1);
                newDifficulty.spawnDelay = Math.max(1200, newDifficulty.spawnDelay - 100);
                newDifficulty.chainBuffer = Math.max(0.5, newDifficulty.chainBuffer - 0.05);
                difficultyRef.current = newDifficulty;
              }
            } else {
              setScore(s => Math.max(0, s - 15));
              setScoreAnimation('bounce-error');
              toast.error(`-15 points! That's recyclable!`);
            }
            
            setTimeout(() => setScoreAnimation(''), 600);
          }
        });

        // Remove objects that hit the ground or were caught
        const remainingObjects = updatedObjects.filter(obj => {
          const hitGround = obj.y > GAME_HEIGHT;
          const wasCaught = checkCollision(obj, playerBin);
          
          if (hitGround && obj.type === 'trash') {
            setScore(s => Math.max(0, s - 5));
            setScoreAnimation('bounce-error');
            toast.error(`-5 points! Trash missed! ${obj.item}`);
            setTimeout(() => setScoreAnimation(''), 600);
          }
          
          return !hitGround && !wasCaught;
        });

        return remainingObjects;
      });

      gameLoopRef.current = requestAnimationFrame(gameLoop);
    };

    gameLoopRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [gameState, spawnObject, checkCollision, playerBin, score]);

  const startGame = () => {
    setGameState('playing');
    setScore(0);
    setObjects([]);
    setBinSpeed(10);
    setLastCatchPosition(GAME_WIDTH / 2);
    setNextObjectChain(null);
    // Reset difficulty to medium settings
    difficultyRef.current = { baseSpeed: 1.2, spawnDelay: 2000, chainBuffer: 0.8 };
    spawnTimeRef.current = Date.now();
    toast.success('Game started! Strategic positioning activated!');
  };

  const resetGame = () => {
    setGameState('menu');
    setScore(0);
    setObjects([]);
    setBinSpeed(10);
    setLastCatchPosition(GAME_WIDTH / 2);
    setNextObjectChain(null);
    difficultyRef.current = { baseSpeed: 1.2, spawnDelay: 2000, chainBuffer: 0.8 };
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen game-bg p-4">
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold mb-2 text-foreground">EcoRecycle Arcade</h1>
        <p className="text-lg text-muted-foreground mb-4">
          Catch the trash 🗑️ and avoid recyclables ♻️
        </p>
        <div className={`text-2xl font-bold ${scoreAnimation}`}>
          Score: {score} | Bin Speed: {binSpeed}
        </div>
      </div>

      <Card className="relative overflow-hidden game-shadow bg-card border-border">
        <div 
          className="relative bg-gradient-to-b from-blue-900/20 to-green-900/30"
          style={{ width: GAME_WIDTH, height: GAME_HEIGHT }}
        >
          {/* Game objects */}
          {objects.map(obj => (
            <div
              key={obj.id}
              className={`absolute transition-transform ${
                obj.type === 'trash' ? 'drop-shadow-lg' : 'drop-shadow-md'
              }`}
              style={{
                left: obj.x,
                top: obj.y,
                transform: `rotate(${obj.rotation}deg)`,
                width: OBJECT_SIZE,
                height: OBJECT_SIZE,
              }}
            >
              <img
                src={obj.item}
                alt={obj.type === 'trash' ? 'Trash item' : 'Recyclable item'}
                className="w-full h-full object-contain"
                style={{ imageRendering: 'crisp-edges' }}
              />
            </div>
          ))}

          {/* Player bin */}
          <div
            className="absolute bottom-0 transition-all duration-75 flex items-center justify-center"
            style={{
              left: playerBin.x,
              width: playerBin.width,
              height: playerBin.height,
            }}
          >
            <img
              src={recycleBin}
              alt="Recycle bin"
              className="w-full h-full object-contain"
              style={{ imageRendering: 'crisp-edges' }}
            />
          </div>

          {/* Game overlay messages */}
          {gameState === 'menu' && (
            <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-4 text-foreground">Ready to Play?</h2>
                <p className="text-muted-foreground mb-6">
                  Use ← → arrow keys to move<br />
                  Space to pause/resume
                </p>
                <Button onClick={startGame} size="lg" className="success-gradient">
                  Start Game
                </Button>
              </div>
            </div>
          )}

          {gameState === 'paused' && (
            <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-4 text-foreground">Paused</h2>
                <p className="text-muted-foreground mb-6">Press Space to continue</p>
                <Button onClick={resetGame} variant="outline">
                  Quit Game
                </Button>
              </div>
            </div>
          )}

          {gameState === 'victory' && (
            <div className="absolute inset-0 bg-background/90 flex items-center justify-center">
              <div className="text-center">
                <h2 className="text-4xl font-bold mb-4 text-primary">🎉 Victory! 🎉</h2>
                <p className="text-2xl font-semibold mb-2 text-foreground">Final Score: {score}</p>
                <p className="text-muted-foreground mb-6">
                  Congratulations! You're an eco-champion!
                </p>
                <div className="space-x-4">
                  <Button onClick={startGame} className="success-gradient">
                    Play Again
                  </Button>
                  <Button onClick={resetGame} variant="outline">
                    Main Menu
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>

      <div className="mt-4 text-center text-sm text-muted-foreground">
        <p>🗑️ Trash: +10 points | ♻️ Recyclables: -15 points | Missed trash: -5 points</p>
        <p className="mt-1 text-primary">🎯 Goal: Reach 150 points to win!</p>
      </div>
    </div>
  );
};