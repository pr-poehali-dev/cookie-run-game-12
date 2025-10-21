import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

type Rarity = 'common' | 'rare' | 'epic' | 'legendary';

interface Character {
  id: string;
  name: string;
  rarity: Rarity;
  emoji: string;
  power: number;
}

const rarityColors: Record<Rarity, string> = {
  common: 'text-gray-400 border-gray-400',
  rare: 'text-cyan-400 border-cyan-400',
  epic: 'text-fuchsia-500 border-fuchsia-500',
  legendary: 'text-yellow-400 border-yellow-400'
};

const rarityGlow: Record<Rarity, string> = {
  common: 'shadow-[0_0_10px_rgba(156,163,175,0.5)]',
  rare: 'shadow-[0_0_20px_rgba(34,211,238,0.6)]',
  epic: 'shadow-[0_0_20px_rgba(217,70,239,0.6)]',
  legendary: 'shadow-[0_0_30px_rgba(250,204,21,0.8)]'
};

const characters: Character[] = [
  { id: '1', name: 'Cookie Runner', rarity: 'common', emoji: '🍪', power: 100 },
  { id: '2', name: 'Cyber Cookie', rarity: 'rare', emoji: '🤖', power: 250 },
  { id: '3', name: 'Neon Warrior', rarity: 'epic', emoji: '⚡', power: 500 },
  { id: '4', name: 'Quantum King', rarity: 'legendary', emoji: '👑', power: 1000 },
  { id: '5', name: 'Digital Ninja', rarity: 'rare', emoji: '🥷', power: 300 },
  { id: '6', name: 'Pixel Mage', rarity: 'epic', emoji: '🔮', power: 450 },
];

const Index = () => {
  const [currentView, setCurrentView] = useState<'home' | 'characters' | 'levels' | 'shop'>('home');
  const [coins, setCoins] = useState(1000);
  const [ownedCharacters, setOwnedCharacters] = useState<Character[]>([]);
  const [showGacha, setShowGacha] = useState(false);
  const [pulledCharacter, setPulledCharacter] = useState<Character | null>(null);
  const [currentLevel, setCurrentLevel] = useState(1);

  const getRarityChance = (): Rarity => {
    const rand = Math.random() * 100;
    if (rand < 50) return 'common';
    if (rand < 75) return 'rare';
    if (rand < 90) return 'epic';
    return 'legendary';
  };

  const pullCharacter = () => {
    if (coins < 100) return;
    
    setCoins(coins - 100);
    const rarity = getRarityChance();
    const availableChars = characters.filter(c => c.rarity === rarity);
    const char = availableChars[Math.floor(Math.random() * availableChars.length)];
    
    setPulledCharacter(char);
    setShowGacha(true);
    
    setTimeout(() => {
      setOwnedCharacters([...ownedCharacters, { ...char, id: `${char.id}-${Date.now()}` }]);
      setShowGacha(false);
      setPulledCharacter(null);
    }, 3000);
  };

  const buyCoins = (amount: number) => {
    setCoins(coins + amount);
  };

  return (
    <div className="min-h-screen bg-[#0A0E27] relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      
      <div className="relative z-10">
        <header className="border-b-2 border-cyan-400 bg-[#0A0E27]/90 backdrop-blur-sm shadow-[0_0_20px_rgba(34,211,238,0.3)]">
          <div className="container mx-auto px-4 py-6">
            <h1 className="text-5xl font-black text-center mb-6 animate-glow-pulse">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-yellow-400" 
                    style={{ filter: 'drop-shadow(0 0 20px rgba(34,211,238,0.8))' }}>
                COOKIE RUN
              </span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-cyan-400 to-fuchsia-500"
                    style={{ filter: 'drop-shadow(0 0 20px rgba(217,70,239,0.8))' }}>
                KINGDOM
              </span>
            </h1>
            
            <div className="flex justify-center items-center gap-2 mb-6">
              <div className="flex items-center gap-2 px-6 py-2 bg-yellow-400/20 border-2 border-yellow-400 rounded-full shadow-[0_0_15px_rgba(250,204,21,0.5)]">
                <Icon name="Coins" className="text-yellow-400" size={24} />
                <span className="text-2xl font-bold text-yellow-400">{coins}</span>
              </div>
            </div>
            
            <nav className="flex justify-center gap-3 flex-wrap">
              {[
                { id: 'home', icon: 'Sparkles', label: 'ГЛАВНАЯ' },
                { id: 'characters', icon: 'Users', label: 'ПЕРСОНАЖИ' },
                { id: 'levels', icon: 'Trophy', label: 'УРОВНИ' },
                { id: 'shop', icon: 'ShoppingCart', label: 'МАГАЗИН' }
              ].map(nav => (
                <Button
                  key={nav.id}
                  onClick={() => setCurrentView(nav.id as any)}
                  variant={currentView === nav.id ? 'default' : 'outline'}
                  className={`
                    px-6 py-3 font-bold text-sm border-2 transition-all duration-300
                    ${currentView === nav.id 
                      ? 'bg-cyan-400 text-[#0A0E27] border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.8)] hover:bg-cyan-300' 
                      : 'bg-transparent text-cyan-400 border-cyan-400 hover:bg-cyan-400/10 hover:shadow-[0_0_15px_rgba(34,211,238,0.5)]'
                    }
                  `}
                >
                  <Icon name={nav.icon as any} size={18} className="mr-2" />
                  {nav.label}
                </Button>
              ))}
            </nav>
          </div>
        </header>

        <main className="container mx-auto px-4 py-12">
          {currentView === 'home' && (
            <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
              <Card className="p-12 bg-gradient-to-br from-[#0F1629] to-[#1A1F3A] border-2 border-fuchsia-500 shadow-[0_0_30px_rgba(217,70,239,0.4)]">
                <div className="text-center space-y-6">
                  <div className="text-8xl animate-float mb-4">🍪</div>
                  <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500">
                    ПОЛУЧИ ПЕРСОНАЖА
                  </h2>
                  <p className="text-cyan-300 text-lg">Испытай удачу в системе случайных призов!</p>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div className="p-3 bg-gray-400/10 border border-gray-400 rounded">
                        <div className="text-gray-400 font-bold">COMMON</div>
                        <div className="text-white">50%</div>
                      </div>
                      <div className="p-3 bg-cyan-400/10 border border-cyan-400 rounded">
                        <div className="text-cyan-400 font-bold">RARE</div>
                        <div className="text-white">25%</div>
                      </div>
                      <div className="p-3 bg-fuchsia-500/10 border border-fuchsia-500 rounded">
                        <div className="text-fuchsia-500 font-bold">EPIC</div>
                        <div className="text-white">15%</div>
                      </div>
                      <div className="p-3 bg-yellow-400/10 border border-yellow-400 rounded">
                        <div className="text-yellow-400 font-bold">LEGENDARY</div>
                        <div className="text-white">10%</div>
                      </div>
                    </div>
                    <Button
                      onClick={pullCharacter}
                      disabled={coins < 100 || showGacha}
                      className="w-full max-w-md mx-auto py-6 text-xl font-black bg-gradient-to-r from-fuchsia-500 to-cyan-400 hover:from-fuchsia-400 hover:to-cyan-300 border-2 border-white shadow-[0_0_25px_rgba(217,70,239,0.6)] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Icon name="Sparkles" size={24} className="mr-2" />
                      ПОЛУЧИТЬ (100 монет)
                    </Button>
                  </div>
                </div>
              </Card>

              <div className="grid md:grid-cols-3 gap-6">
                <Card className="p-6 bg-[#0F1629] border-2 border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.3)] hover:shadow-[0_0_25px_rgba(34,211,238,0.5)] transition-all">
                  <div className="text-cyan-400 text-4xl mb-3">👥</div>
                  <h3 className="text-xl font-bold text-cyan-400 mb-2">МОИ ПЕРСОНАЖИ</h3>
                  <p className="text-cyan-300">{ownedCharacters.length} собрано</p>
                </Card>
                <Card className="p-6 bg-[#0F1629] border-2 border-fuchsia-500 shadow-[0_0_15px_rgba(217,70,239,0.3)] hover:shadow-[0_0_25px_rgba(217,70,239,0.5)] transition-all">
                  <div className="text-fuchsia-500 text-4xl mb-3">🏆</div>
                  <h3 className="text-xl font-bold text-fuchsia-500 mb-2">ТЕКУЩИЙ УРОВЕНЬ</h3>
                  <p className="text-fuchsia-300">Уровень {currentLevel}</p>
                </Card>
                <Card className="p-6 bg-[#0F1629] border-2 border-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.3)] hover:shadow-[0_0_25px_rgba(250,204,21,0.5)] transition-all">
                  <div className="text-yellow-400 text-4xl mb-3">💰</div>
                  <h3 className="text-xl font-bold text-yellow-400 mb-2">МОНЕТЫ</h3>
                  <p className="text-yellow-300">{coins} доступно</p>
                </Card>
              </div>
            </div>
          )}

          {currentView === 'characters' && (
            <div className="animate-fade-in">
              <h2 className="text-3xl font-black text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500">
                МОЯ КОЛЛЕКЦИЯ
              </h2>
              {ownedCharacters.length === 0 ? (
                <Card className="p-12 bg-[#0F1629] border-2 border-cyan-400 text-center">
                  <div className="text-6xl mb-4">😢</div>
                  <p className="text-cyan-300 text-xl">У вас пока нет персонажей. Получите первого!</p>
                </Card>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {ownedCharacters.map(char => (
                    <Card key={char.id} className={`p-6 bg-[#0F1629] border-2 ${rarityColors[char.rarity]} ${rarityGlow[char.rarity]} transition-all hover:scale-105`}>
                      <div className="text-center space-y-3">
                        <div className="text-6xl animate-float">{char.emoji}</div>
                        <h3 className={`font-bold ${rarityColors[char.rarity]}`}>{char.name}</h3>
                        <Badge className={`${rarityColors[char.rarity]} bg-transparent border uppercase`}>
                          {char.rarity}
                        </Badge>
                        <div className="flex items-center justify-center gap-2">
                          <Icon name="Zap" size={16} className="text-yellow-400" />
                          <span className="text-white font-bold">{char.power}</span>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}

          {currentView === 'levels' && (
            <div className="max-w-4xl mx-auto animate-fade-in">
              <h2 className="text-3xl font-black text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500">
                УРОВНИ
              </h2>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map(level => (
                  <Card key={level} className={`p-6 bg-[#0F1629] border-2 ${level <= currentLevel ? 'border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.3)]' : 'border-gray-600'}`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className={`text-4xl ${level <= currentLevel ? 'animate-glow-pulse' : 'opacity-50'}`}>
                          {level <= currentLevel ? '⭐' : '🔒'}
                        </div>
                        <div>
                          <h3 className={`text-xl font-bold ${level <= currentLevel ? 'text-cyan-400' : 'text-gray-500'}`}>
                            УРОВЕНЬ {level}
                          </h3>
                          <p className="text-sm text-cyan-300">
                            {level <= currentLevel ? 'Доступен' : 'Заблокирован'}
                          </p>
                        </div>
                      </div>
                      {level <= currentLevel && (
                        <Button 
                          onClick={() => level === currentLevel && setCurrentLevel(currentLevel + 1)}
                          className="bg-cyan-400 text-[#0A0E27] hover:bg-cyan-300 font-bold border-2 border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.5)]"
                        >
                          {level === currentLevel ? 'ИГРАТЬ' : 'ПРОЙДЕН'}
                        </Button>
                      )}
                    </div>
                    {level === currentLevel && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm text-cyan-300">
                          <span>Прогресс</span>
                          <span>0%</span>
                        </div>
                        <Progress value={0} className="h-3" />
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            </div>
          )}

          {currentView === 'shop' && (
            <div className="max-w-4xl mx-auto animate-fade-in">
              <h2 className="text-3xl font-black text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500">
                МАГАЗИН
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { amount: 500, cost: '$2.99', popular: false },
                  { amount: 1500, cost: '$7.99', popular: true },
                  { amount: 5000, cost: '$19.99', popular: false }
                ].map((pack, idx) => (
                  <Card key={idx} className={`p-8 bg-[#0F1629] border-2 relative ${pack.popular ? 'border-fuchsia-500 shadow-[0_0_25px_rgba(217,70,239,0.5)] scale-105' : 'border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.3)]'}`}>
                    {pack.popular && (
                      <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-fuchsia-500 text-white border-0 shadow-[0_0_15px_rgba(217,70,239,0.6)]">
                        ПОПУЛЯРНОЕ
                      </Badge>
                    )}
                    <div className="text-center space-y-4">
                      <div className="text-5xl animate-glow-pulse">💰</div>
                      <div className="text-3xl font-black text-yellow-400">{pack.amount}</div>
                      <div className="text-cyan-300">монет</div>
                      <Button 
                        onClick={() => buyCoins(pack.amount)}
                        className={`w-full py-6 font-bold text-lg ${pack.popular ? 'bg-gradient-to-r from-fuchsia-500 to-cyan-400 hover:from-fuchsia-400 hover:to-cyan-300 shadow-[0_0_20px_rgba(217,70,239,0.5)]' : 'bg-cyan-400 text-[#0A0E27] hover:bg-cyan-300 shadow-[0_0_15px_rgba(34,211,238,0.4)]'}`}
                      >
                        {pack.cost}
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>

      {showGacha && pulledCharacter && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 animate-fade-in">
          <Card className={`p-12 bg-[#0F1629] border-4 ${rarityColors[pulledCharacter.rarity]} ${rarityGlow[pulledCharacter.rarity]} animate-scale-in`}>
            <div className="text-center space-y-6">
              <div className="text-9xl animate-float">{pulledCharacter.emoji}</div>
              <Badge className={`${rarityColors[pulledCharacter.rarity]} bg-transparent border-2 text-2xl px-6 py-2 uppercase`}>
                {pulledCharacter.rarity}
              </Badge>
              <h3 className={`text-4xl font-black ${rarityColors[pulledCharacter.rarity]}`}>
                {pulledCharacter.name}
              </h3>
              <div className="flex items-center justify-center gap-3">
                <Icon name="Zap" size={32} className="text-yellow-400" />
                <span className="text-4xl font-black text-white">{pulledCharacter.power}</span>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Index;
