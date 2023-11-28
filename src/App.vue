<script setup>
import { ref, computed } from 'vue';
import { questionsData } from './questions.js';

const questions = ref(questionsData);
const quizCompleted = ref(false);
const currentQuestion = ref(0);

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
		<h1>Web Dev Quiz! (CPS530 Related)</h1>
		
		<section class="quiz" v-if="!quizCompleted">
			<div class="quiz-info">
				<div class="question">
			{{ currentQuestion+1 }}.
			{{ getCurrentQuestion.question }} 
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
					<span>{{ option }}</span>
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
		<p>Your score is {{ score }}/{{ questions.length }}</p>
		
		<button @click="restartQuiz">Restart Quiz</button>
    </section>
	</main>
</template>
