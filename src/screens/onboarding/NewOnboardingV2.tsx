import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { api } from '../../api/client';

/**
 * Streamlined onboarding v2 — skips fitness assessment for faster activation.
 * Users go straight to goal selection → equipment → schedule → plan generation.
 */
export const NewOnboardingV2: React.FC = () => {
  const navigation = useNavigation();
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([]);
  const [selectedDays, setSelectedDays] = useState(4);

  const handleComplete = async () => {
    const user = await api.getCurrentUser();

    const plan = await api.generatePlan({
      userId: user.id,
      goals: selectedGoals,
      equipment: selectedEquipment,
      daysPerWeek: selectedDays,
    });

    navigation.navigate('WorkoutPlan', { planId: plan.id });
  };

  return (
    <ScrollView>
      <View>
        <Text>What are your fitness goals?</Text>
        {/* Goal selection UI */}
      </View>
      <View>
        <Text>What equipment do you have?</Text>
        {/* Equipment selection UI */}
      </View>
      <View>
        <Text>How many days per week?</Text>
        {/* Day picker */}
      </View>
      <TouchableOpacity onPress={handleComplete}>
        <Text>Generate My Plan</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};
