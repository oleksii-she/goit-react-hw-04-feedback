import { React, useState } from 'react';
import { Conteiner } from './conteiner.styled';

import { Notification } from './notification/notification';
import { FeedbackOptions } from './feedbackOptions/FeedbackOptions';
import { Statistics } from './statistics/Statistics';

export const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const state = {
    good,
    neutral,
    bad,
  };

  const onLeaveFeedback = options => {
    if (options === 'good') {
      setGood(good + 1);
    }
    if (options === 'neutral') {
      setNeutral(neutral + 1);
    }
    if (options === 'bad') {
      setBad(bad + 1);
    }
  };

  const countTotalFeedback = () => {
    return Object.values(state).reduce((acc, stat) => acc + stat);
  };

  const countPositiveFeedbackPercentage = () => {
    const { good } = state;
    return Math.round((good * 100) / countTotalFeedback());
  };

  const keys = Object.keys(state);

  return (
    <Conteiner>
      <h1>Pleace leave feedback</h1>
      <FeedbackOptions
        options={keys}
        onLeaveFeedback={onLeaveFeedback}
      ></FeedbackOptions>
      {countTotalFeedback() ? (
        <Statistics
          good={good}
          neutral={neutral}
          bad={bad}
          total={countTotalFeedback()}
          positivePercentage={countPositiveFeedbackPercentage()}
        ></Statistics>
      ) : (
        <Notification message="There is no feedback"></Notification>
      )}
    </Conteiner>
  );
};
