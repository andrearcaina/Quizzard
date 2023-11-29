<script setup>
import { ref, computed } from 'vue';
import { questionsData } from './questions.js';

const quizStarted = ref(false);
const questions = ref(questionsData);
const quizCompleted = ref(false);
const currentQuestion = ref(0);

const startQuiz = () => {
	quizStarted.value = true;
};

const score = computed(() => {
	let value = 0;
	questions.value.map(q => {
		if (q.selected != null && q.answer == q.selected) {
			value++;
		}
	})
	return value;
});

const getCurrentQuestion = computed(() => {
	return questions.value[currentQuestion.value];
});

const SetAnswer = (e) => {
	questions.value[currentQuestion.value].selected = e.target.value;
	e.target.value = null;
};

const NextQuestion = () => {
	if (currentQuestion.value < questions.value.length - 1) {
		currentQuestion.value++;
		return;
	}
	
	quizCompleted.value = true;
};

const restartQuiz = () => {
	currentQuestion.value = 0;
	quizCompleted.value = false;
	questions.value.forEach((q) => {
		q.selected = null;
	});
};
</script>

<template>
	<main class="app">
		<section class="blurb" v-if="!quizStarted">
			<h2>Lab 10 Problem 3</h2>
			
			<p>This was how I installed Vue.js with Vite:</p>
			<pre class="install">
				<code>
				$ npm create vite@latest
				? Project name: .
				? Package name: quiz-app
				? Select a framework: vue
				? Select a variant: JavaScript

				Done. Now run:
				$ npm install
				$ npm run dev
				</code>
			</pre>

			<p> Fairly simple, all I had to do was follow a tutorial. </p>

			<div style="margin-top: 25px;">
				<h2>Difficulties Encountered and Solutions</h2>
			
				<ul>
					<li>
						<strong>Challenge:</strong> Trying to understand Vue.js Syntax.
						<br />
						<strong>Solution:</strong> Well, the best way to learn is to practice. I had to go through the documentation and watch some tutorials to get a better understanding of Vue.js. That's all. Overall, it was a fun experience!
					</li>
					<li> 
						<strong>Challenge:</strong> Deploying on GitHub Pages!
						<br />
						<strong>Solution:</strong> This took a while, but I finally got it. I had to install github pages onto vue, and then go into my package.json and add a script called "deploy". This allows me to deploy the app onto GitHub Pages.
					</li>


				</ul>
			</div>
			
			<button class="align" v-if="!quizStarted" @click="startQuiz">Start Quizzard!</button>
		</section>
		
		<section v-if="quizStarted">
			<h1>Web Dev Quiz! (CPS530 Related)</h1>
			
			<section class="quiz" v-if="!quizCompleted">
				<div class="quiz-info">
					<div class="question">
						{{ currentQuestion+1 }}. {{ getCurrentQuestion.question }} 
						
						<div class="code" v-if="getCurrentQuestion.code">
							{{ getCurrentQuestion.code }}
						</div>
					</div>

					<div class="score">Score {{ score }}/{{ questions.length }}</div>
				</div>
				
				<div class="options">
					<label 
						v-for="(option, index) in getCurrentQuestion.options" 
						:for="'option' + index" 
						:class="`option ${
							getCurrentQuestion.selected == index 
								? index == getCurrentQuestion.answer 
									? 'correct' 
									: 'wrong'
								: ''
						} ${
							getCurrentQuestion.selected != null &&
							index != getCurrentQuestion.selected
								? 'disabled'
								: ''
						}`">
						
						<input 
							type="radio" 
							:id="'option' + index" 
							:name="getCurrentQuestion.index" 
							:value="index" 
							v-model="getCurrentQuestion.selected" 
							:disabled="getCurrentQuestion.selected"
							@change="SetAnswer" 
						/>
						<div>{{ option }}</div>
					
						<div v-if="getCurrentQuestion.selected != null && getCurrentQuestion.selected == index && index != getCurrentQuestion.answer" class="correct-answer">
							Correct Answer: {{ getCurrentQuestion.options[getCurrentQuestion.answer] }}
						</div>
					</label>
				</div>
				
				<button 
					@click="NextQuestion" 
					:disabled="!getCurrentQuestion.selected">
					{{ 
						getCurrentQuestion.index == questions.length - 1 
							? 'Finish' 
							: getCurrentQuestion.selected == null
								? 'Select an option'
								: 'Next question'
					}}
				</button>
			</section>

			<section v-else>
				<p>You have a score of: {{ score }}/{{ questions.length }}</p>
				<p> or {{ Math.round((score/questions.length)*100) }}%</p>
				<p v-if="Math.round((score/questions.length)*100) < 50"> You failed! </p>
				<p v-if="Math.round((score/questions.length)*100) >= 50"> You passed! </p>
				
				<div>
					<button class="align" @click="restartQuiz">Restart Quiz</button>
				</div>
			</section>
		</section>
	</main>
</template>
