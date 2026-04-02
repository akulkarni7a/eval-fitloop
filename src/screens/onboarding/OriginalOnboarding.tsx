import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { api } from '../../api/client';

/**
 * Original onboarding flow with fitness assessment.
 * Assessment → Goals → Equipment → Schedule → Plan generation.
 */
export const OriginalOnboarding: React.FC = () => {
  const navigation = useNavigation();
  const [assessmentData, setAssessmentData] = useState(null);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([]);
  const [selectedDays, setSelectedDays] = useState(4);

  const handleComplete = async () => {
    const user = await api.getCurrentUser();

    // Submit fitness assessment first
    const assessmentResult = await api.submitAssessment(user.id, assessmentData);

    const plan = await api.generatePlan({
      userId: user.id,
      goals: selectedGoals,
      fitnessBaseline: assessmentResult.baseline,
      age: user.age,
      injuries: assessmentResult.injuries,
      equipment: selectedEquipment,
      daysPerWeek: selectedDays,
    });

    navigation.navigate('WorkoutPlan', { planId: plan.id });
  };

  return (
    <ScrollView>
      <View>
        <Text>Tell us about your fitness level</Text>
        {/* 5-question fitness assessment:
            1. Current activity level
            2. Exercise frequency
            3. Any injuries or limitations
            4. Age range
            5. Prior experience with structured programs
        */}
      </View>
      <View>
        <Text>What are your fitness goals?</Text>
      </View>
      <TouchableOpacity onPress={handleComplete}>
        <Text>Generate My Plan</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};
