import { defineStore } from 'pinia';
import { ref, computed, reactive, onMounted, watch } from "vue";
import * as Letters from "@/components/letters";
import { getRandomItem } from "@/script/helpers/random.js";

export default defineStore("Router", ()=>{

    const viewId = ref(0);

// letter
    const letterId = ref(0);

    const alpha = ref(
        [
            {id: 0, letter: "А", title: "Амнезия", component: Letters.LA},
            {id: 1, letter: "Б", title: "Биполярное расстройство", empty: true},
            {id: 2, letter: "В", title: "", empty: true},
            {id: 3, letter: "Г", title: "Глаукома", empty: true},//?
            {id: 4, letter: "Д", title: "Деменция", component: Letters.LD},
            {id: 5, letter: "Е", title: "", empty: true},
            {id: 6, letter: "Ё", title: "", empty: true},
            {id: 7, letter: "Ж", title: "", empty: true},
            {id: 8, letter: "З", title: "Заикание", component: Letters.LZ},
            {id: 9, letter: "И", title: "Инсомния", empty: true}, //?
            {id: 10, letter: "Й", title: "", empty: true},
            {id: 11, letter: "К", title: "", empty: true},
            {id: 12, letter: "Л", title: "Лалофобия", empty: true},
            {id: 13, letter: "М", title: "Меланхолия", component: Letters.LM},
            {id: 14, letter: "Н", title: "Невроз", component: Letters.LN},
            {id: 15, letter: "О", title: "ОКР", component: Letters.LO},
            {id: 16, letter: "П", title: "Передозировка", component: Letters.LP},
            {id: 17, letter: "Р", title: "", empty: true},
            {id: 18, letter: "С", title: "СДВГ", component: Letters.LS},
            {id: 19, letter: "Т", title: "Токсикомания", empty: true},
            {id: 20, letter: "У", title: "", empty: true},
            {id: 21, letter: "Ф", title: "", empty: true},
            {id: 22, letter: "Х", title: "", empty: true},
            {id: 23, letter: "Ц", title: "", empty: true},
            {id: 24, letter: "Ч", title: "", empty: true},
            {id: 25, letter: "Ш", title: "Шизофазия", empty: true},
            {id: 26, letter: "Щ", title: "", empty: true},
            {id: 27, letter: "Ъ", title: "", empty: true},
            {id: 28, letter: "Ы", title: "", empty: true},
            {id: 29, letter: "Ь", title: "Смерть", component: Letters.LDeath},
            {id: 30, letter: "Э", title: "Эпилепсия", component: Letters.LYe},
            {id: 31, letter: "Ю", title: "", empty: true},
            {id: 32, letter: "Я", title: "", empty: true}
        ]
    );

    const availableAlphaIds = computed(()=>alpha.value.filter(e => !e.empty).map(e => e.id));

    //change letter
        const changeLetterFreeze = ref(false);
        const letterIdOld = ref(0);
        const letterIdToBe = ref(0);

        const changeLetter = (id, sound)=>{
            if(changeLetterFreeze.value)return;
            
            viewId.value = 1;
            
            if(id == letterIdToBe.value)return;

            if(sound){
                let audio = new Audio('/sounds/blister_pop.mp3');
                audio.play();
            }

            changeLetterFreeze.value = true;
            
            letterIdOld.value = letterIdToBe.value;
            letterIdToBe.value = id;
            
            setTimeout(()=>{
                letterId.value = id;
            }, 400);

            setTimeout(()=>{changeLetterFreeze.value = false}, 900);
        }

        
        const nextLetter = (v)=>{
            let l;

            if(v < 0 && letterId.value < alpha.value.length-1){
                l = availableAlphaIds.value[availableAlphaIds.value.indexOf(letterId.value) + 1];
                if(l != null)changeLetter(l);
                return;
            }
            if(v > 0 && letterId.value > 0){
                l = availableAlphaIds.value[availableAlphaIds.value.indexOf(letterId.value) - 1];
                if(l != null)changeLetter(l);
                return;
            }
        }

//pill
    const pillsConsumed = ref(0);
    const pillFreeze = ref(false);
    const overdose = ref(false);

    const consumePill = ()=>{
        if(pillFreeze.value)return;

        pillFreeze.value = true;

        const sounds = [
            new Audio('/sounds/gulp (1).mp3'),
            new Audio('/sounds/gulp (2).mp3'),
            new Audio('/sounds/gulp (3).mp3'),
            new Audio('/sounds/gulp (4).mp3'),
            new Audio('/sounds/gulp (5).mp3'),
            new Audio('/sounds/gulp (6).mp3'),
            new Audio('/sounds/gulp (7).mp3'),
        ];

        getRandomItem(sounds)?.play();
        
        pillsConsumed.value++;

        if(pillsConsumed.value >= 8)overdose.value = true;
        

        setTimeout(()=>{pillFreeze.value = false}, 900);
    }

    watch(overdose, (n)=>{
        if(n){
            document.body.setAttribute('overdose', '')
            new Audio('/sounds/fall.mp3')?.play();
            changeLetter(16);
        }
    })
    
//----------------------------------------------------------------
    return {
        viewId,

        letterId,
        alpha,
        
        changeLetterFreeze,
        letterIdOld,
        letterIdToBe,
        changeLetter,
        nextLetter,

        pillsConsumed,
        pillFreeze,
        consumePill,

        overdose
    }
})