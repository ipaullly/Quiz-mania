import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native-web';
import HelperFunctions from "../utilities/utility";

const Quiz = ({navigation}) => {
  const [questions, setQuestions] = useState();
  const [currentQuestion, setCurrentQuestion] = useState();
  const [currentAnswers, setCurrentAnswers] = useState();
  const [correctAnswer, setCorrectAnswer] = useState();
  const [correctAnswerIdx, setCorrectAnswerIdx] = useState();
  const [selectedChoice, setSelectedChoice] = useState();
  const [questionCount, setQuestionCount] = useState(0);
  const [score, setScore] = useState(0);

  const getQuiz = async () => {
    let url = "https://opentdb.com/api.php?amount=10&category=22&difficulty=easy&type=multiple";
    const res = await fetch(url);
    const data = await res.json();
    console.log('data.results',data.results)
    setQuestions(data.results);
    setCurrentQuestion(data.results[0]);
    setCorrectAnswer(data.results[0].correct_answer)
    let randomAnswers = [
      ...data.results[0].incorrect_answers,
      data.results[0].correct_answer
    ];
    randomAnswers = HelperFunctions.shuffle(randomAnswers)
    setCurrentAnswers(randomAnswers)
  }
  
  useEffect(() => {
    getQuiz();
  }, []);

  const handleMultipleChoiceSelection = (e) => {
    let idxOfCorrectAnswer = currentAnswers.indexOf(correctAnswer);
    console.log("idxOfCorrectAnswer", idxOfCorrectAnswer);
    console.log('selected index', e);
    if (e === idxOfCorrectAnswer) {
      setScore(score+10)
    }
    setCorrectAnswerIdx(idxOfCorrectAnswer)
    setSelectedChoice(e+1)
  }

  const handleNextQuestion = () => {
    let newIndex = questionCount + 1;
    console.log("next index", newIndex);
    if (newIndex < questions.length) {
      setSelectedChoice(0);
      setQuestionCount(newIndex);
      setCurrentQuestion(questions[newIndex]);
      setCorrectAnswer(questions[newIndex].correct_answer);
      let randomAnswers = [
        ...questions[newIndex].incorrect_answers,
        questions[newIndex].correct_answer,
      ];
      randomAnswers = HelperFunctions.shuffle(randomAnswers);
      setCurrentAnswers(randomAnswers); 
    } else {
      navigation.navigate('Result')
    }
  }
  
  return (
    <View style={styles.page}>
      {questions ? (
        <View style={styles.container}>
          <View style={styles.top}>
            <Text style={styles.question}>
              Q{questionCount + 1}.{" "}
              {currentQuestion ? currentQuestion.question : ""}
            </Text>
            {score >= 10 && (
              <View style={styles.scoreView}>
                <Text style={styles.score}>{score}</Text>
              </View>
            )}
          </View>
          <View style={styles.options}>
            {currentAnswers &&
              currentAnswers.map((answer, idx) =>
                !selectedChoice ? (
                  <TouchableOpacity
                    key={idx}
                    style={styles.optionBottom}
                    onPress={() => handleMultipleChoiceSelection(idx)}
                  >
                    <Text style={styles.option}>
                      {idx + 1}
                      {". " + answer}
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    key={idx}
                    style={
                      idx === correctAnswerIdx
                        ? styles.rightOptionBottom
                        : styles.wrongOptionBottom
                    }
                  >
                    <Text style={styles.wrongOption}>
                      {idx + 1}
                      {". " + answer}
                    </Text>
                  </TouchableOpacity>
                )
              )}
          </View>
          <View style={styles.bottom}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>SKIP</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleNextQuestion()}
              style={styles.button}
            >
              <Text style={styles.buttonText}>NEXT</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.activityLoad}>
          <ActivityIndicator size="large" color="#FE7E6D" />
        </View>
      )}
    </View>
  );
};

export default Quiz;

const styles = StyleSheet.create({
  page: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  activityLoad: {
    backgroundColor: "#FEECE9",
  },
  container: {
    paddingTop: 40,
    paddingHorizontal: 20,
    height: "100%",
  },
  top: {
    marginVertical: 16,
    flexDirection: "row",
  },
  question: {
    fontSize: 28,
    fontWeight: "200",
    flex: 6,
  },
  scoreView: {
    flex: 1,
    backgroundColor: "#FE7E6D",
    borderRadius: 12,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  score: {
    color: "#000",
    fontWeight: 500,
    fontSize: 20
  },
  options: {
    flex: 1,
  },
  option: {
    fontSize: 18,
    fontWeight: "300",
  },
  optionBottom: {
    paddingVertical: 12,
    marginVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: "#CCD1E4",
  },
  rightOption: {
    fontSize: 18,
    fontWeight: "300",
  },
  rightOptionBottom: {
    paddingVertical: 12,
    marginVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: "green",
  },
  wrongOption: {
    fontSize: 18,
    fontWeight: "300",
    color: "white",
  },
  wrongOptionBottom: {
    paddingVertical: 12,
    marginVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: "red",
  },
  bottom: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  button: {
    backgroundColor: "#2F3A8F",
    width: "20%",
    padding: 16,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
  },
});
