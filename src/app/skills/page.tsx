
"use client";

import React, { useState } from 'react';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap, TrendingUp, Info, Gem, Star } from 'lucide-react'; 
import { allSkillDefinitions, getSkillDefinitionById, type SkillDefinition } from '@/game-data/skills';
import type { UserSkillProgress } from '@/types/skills';
import { useXp } from '@/contexts/XpContext';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

const SkillCard: React.FC<{
  skillDef: SkillDefinition;
  userSkillLevel: number;
  onUpgrade: (skillId: string, cost: number) => void;
  canAffordUpgrade: boolean;
}> = ({ skillDef, userSkillLevel, onUpgrade, canAffordUpgrade }) => {
  const isMaxLevel = userSkillLevel >= skillDef.maxLevel;
  const costForNextLevel = isMaxLevel ? 0 : skillDef.costPerLevel(userSkillLevel);
  const IconComponent = skillDef.icon || Info;

  return (
    <Card className="bg-card border-border shadow-lg hover:shadow-primary/30 transition-shadow duration-300 flex flex-col">
      <CardHeader className="items-center text-center">
        <div className="p-3 bg-primary/10 rounded-full mb-2 inline-block">
          <IconComponent className="h-10 w-10 text-primary" />
        </div>
        <CardTitle className="text-lg font-headline text-primary">{skillDef.name}</CardTitle>
        <CardDescription className="text-xs text-muted-foreground min-h-[3em]">{skillDef.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow text-sm space-y-2">
        <div className="text-center mb-2">
            <p className="text-xs text-muted-foreground">Level: <span className="font-bold text-foreground">{userSkillLevel} / {skillDef.maxLevel}</span></p>
            {skillDef.maxLevel > 0 && (
                <Progress value={(userSkillLevel/skillDef.maxLevel)*100} className="h-1.5 mt-1" />
            )}
        </div>
        <p><strong>Current Effect:</strong> <span className="text-muted-foreground">{skillDef.effectDescription(userSkillLevel)}</span></p>
        {!isMaxLevel && (
          <p><strong>Next Level:</strong> <span className="text-muted-foreground">{skillDef.effectDescription(userSkillLevel + 1)}</span></p>
        )}
      </CardContent>
      <CardFooter className="flex flex-col items-center">
        {isMaxLevel ? (
          <p className="text-sm text-accent font-semibold">Max Level Reached!</p>
        ) : (
          <>
            <p className="text-xs text-muted-foreground mb-1">Cost to Upgrade: <Gem className="inline h-3 w-3 mr-0.5 text-accent" />{costForNextLevel.toLocaleString()} XP</p>
            <Button
              onClick={() => onUpgrade(skillDef.id, costForNextLevel)}
              disabled={!canAffordUpgrade || isMaxLevel}
              variant="default"
              size="sm"
              className="w-full"
            >
              <TrendingUp className="mr-2 h-4 w-4" /> Upgrade
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
};

export default function SkillsPage() {
  const { availableXp, spendXpOnSkill, canAffordSkillUpgrade: contextCanAfford } = useXp();
  const { toast } = useToast();
  
  const [userSkills, setUserSkills] = useState<Record<string, UserSkillProgress>>(
    allSkillDefinitions.reduce((acc, skill) => {
      acc[skill.id] = { skillId: skill.id, currentLevel: 0 };
      return acc;
    }, {} as Record<string, UserSkillProgress>)
  );

  const handleUpgradeSkill = (skillId: string, cost: number) => {
    const skillDef = getSkillDefinitionById(skillId);
    if (!skillDef) return;

    const currentSkillProgress = userSkills[skillId] || { skillId, currentLevel: 0 };
    if (currentSkillProgress.currentLevel >= skillDef.maxLevel) {
      toast({ title: "Max Level", description: `${skillDef.name} is already at max level.`, variant: "destructive" });
      return;
    }

    if (spendXpOnSkill(cost)) {
      setUserSkills(prevSkills => ({
        ...prevSkills,
        [skillId]: {
          ...currentSkillProgress,
          currentLevel: currentSkillProgress.currentLevel + 1,
        },
      }));
      toast({
        title: "Skill Upgraded!",
        description: `${skillDef.name} is now level ${currentSkillProgress.currentLevel + 1}.`,
      });
    } else {
      toast({ title: "Not Enough XP", description: `You need ${cost.toLocaleString()} XP to upgrade ${skillDef.name}.`, variant: "destructive" });
    }
  };

  return (
    <div className="min-h-screen text-foreground flex flex-col">
      <Navbar />
      <main className={cn(
        "flex-grow landing-scroll-container"
      )}>
        <section className="landing-scroll-section">
          <div className="container mx-auto px-4 py-8 sm:py-10"> {/* Adjusted padding */}
            <header className="mb-8 sm:mb-10 text-center">
              <Star className="mx-auto h-12 w-12 sm:h-16 sm:w-16 text-primary mb-3 sm:mb-4" />
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-headline text-primary">Player Skills</h1>
              <p className="text-md sm:text-lg text-muted-foreground mt-1 px-2">
                Enhance your abilities by spending Experience Points (XP).
              </p>
            </header>

            <Card className="mb-6 sm:mb-8 bg-card border-border shadow-md">
              <CardHeader>
                <CardTitle className="text-xl text-primary flex items-center justify-center">
                    <Gem className="mr-2 h-5 w-5 text-accent" /> Available XP for Upgrades
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-4xl font-bold text-accent">{availableXp.toLocaleString()}</p>
              </CardContent>
            </Card>

            {allSkillDefinitions.length === 0 ? (
              <Card className="bg-card border-border shadow-lg text-center py-10">
                <CardHeader>
                  <CardTitle className="text-xl text-muted-foreground">No Skills Available</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Check back later for new skills to learn!</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {allSkillDefinitions.map((skillDef) => {
                  const userSkill = userSkills[skillDef.id] || { skillId: skillDef.id, currentLevel: 0 };
                  const costForNext = skillDef.costPerLevel(userSkill.currentLevel);
                  return (
                    <SkillCard
                      key={skillDef.id}
                      skillDef={skillDef}
                      userSkillLevel={userSkill.currentLevel}
                      onUpgrade={handleUpgradeSkill}
                      canAffordUpgrade={contextCanAfford(costForNext)}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
