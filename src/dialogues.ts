//import { Dialog } from '../node_modules/@dcl/npc-utils/utils/types'
import { Dialog } from './npc-utils/utils/types'
import { santaNPC, santaNPC2, grinchNPC } from './game'
//import { DIALOGUE_PROGRESS } from './game'

var DIALOGUE_PROGRESS = 0

export function GetDialogueProgress() 
{
  return DIALOGUE_PROGRESS
}

export let Dialogue1: Dialog[] = [
  {
    text: `...`,
    triggeredByNext: () => {
      santaNPC.addComponentOrReplace(new AudioSource(new AudioClip('audio/Santa_1.mp3')))
      santaNPC.getComponent(AudioSource).playOnce()  
    },
    typeSpeed: 29
  },
  {
    text: `Hohoho! Why hello there Decentralander!`,
    triggeredByNext: () => {
      santaNPC.addComponentOrReplace(new AudioSource(new AudioClip('audio/Santa_2.mp3')))
      santaNPC.getComponent(AudioSource).playOnce()  
    },
    typeSpeed: 29
  },
  {
    text: `I'm about to deliver some presents. But as it seems, some pesky villains are trying to steal Christmas from us. `,
    isQuestion: true,
    buttons: [
      { label: `Are you really Santa?`, goToDialog: 3 , triggeredActions: () => {
        santaNPC.addComponentOrReplace(new AudioSource(new AudioClip('audio/Santa_3.mp3')))
        santaNPC.getComponent(AudioSource).playOnce()  
      },
      },
      { label: `Hi Santa!`, goToDialog: 4 , triggeredActions: () => {
        santaNPC.addComponentOrReplace(new AudioSource(new AudioClip('audio/Santa_4.mp3')))
        santaNPC.getComponent(AudioSource).playOnce()  
      },
      },
    ],
    typeSpeed: 29
  },
  {
    text: `Yes, this is really Santa Claus.`,
    triggeredByNext: () => {
      santaNPC.addComponentOrReplace(new AudioSource(new AudioClip('audio/Santa_4.mp3')))
      santaNPC.getComponent(AudioSource).playOnce()  
    },
    typeSpeed: 29
  },
  {
    text: `How about it, would you like to help Santa save Christmas?`,
    isQuestion: true,
    buttons: [
      { label: `Yes!`, goToDialog: 6 , triggeredActions: () => {
        santaNPC.addComponentOrReplace(new AudioSource(new AudioClip('audio/Santa_6.mp3')))
        santaNPC.getComponent(AudioSource).playOnce()
        DIALOGUE_PROGRESS = 1
      },
      },
      { label: `Will I be rewarded?`, goToDialog: 5 , triggeredActions: () => {
        santaNPC.addComponentOrReplace(new AudioSource(new AudioClip('audio/Santa_5.mp3')))
        santaNPC.getComponent(AudioSource).playOnce()  
      },
      },
    ],
    typeSpeed: 29
  },
  {
    text: `Good question. I will see to it that you are rewarded handsomely.`,
    triggeredByNext: () => {
      santaNPC.addComponentOrReplace(new AudioSource(new AudioClip('audio/Santa_6.mp3')))
      santaNPC.getComponent(AudioSource).playOnce()  
      DIALOGUE_PROGRESS = 1
    },
    typeSpeed: 29
  },
  {
    text: `On the sleigh we go!`, // 6
    isEndOfDialog: true,
    typeSpeed: 29
  }, 
  {
    text: `Hang on tight now!`, // 7
    isEndOfDialog: true,
    typeSpeed: 29
  },
  {
    text: `Go, throw the presents into the chimneys.`, // 8
    isEndOfDialog: true,
    typeSpeed: 29
  },
  {
    text: `Well done.`, // 9
    isEndOfDialog: true,
    typeSpeed: 29
  },
  {
    text: `Here comes the pesky villains!`, // 10
    isEndOfDialog: true,
    typeSpeed: 29
  },
  {
    text: `We've prepared some special presents for them. Knock 'em down!`, // 11
    isEndOfDialog: true,
    typeSpeed: 29
  },
  {
    text: `How poetic! `, // 12
    isEndOfDialog: true,
    typeSpeed: 29
  }
]

export let DialogueWin: Dialog[] = [
  {
    text: `Well done!`, // 0
    triggeredByNext: () => {
      santaNPC2.addComponentOrReplace(new AudioSource(new AudioClip('audio/Santa_13.mp3')))
      santaNPC2.getComponent(AudioSource).playOnce()  
    },
    typeSpeed: 29
  },
  {
    text: `Why thank you lad, you did it! Christmas is saved. `, // 1
    triggeredByNext: () => {
      santaNPC2.addComponentOrReplace(new AudioSource(new AudioClip('audio/Santa_14.mp3')))
      santaNPC2.getComponent(AudioSource).playOnce()  
    },
    typeSpeed: 29
  },
  {
    text: `Ah yes, what would you like for your reward?  `, // 2
    isQuestion: true,
    buttons: [
      { label: `10X? Moon? MANA? $`, goToDialog: 3 , triggeredActions: () => {
        santaNPC2.addComponentOrReplace(new AudioSource(new AudioClip('audio/Santa_15.mp3')))
        santaNPC2.getComponent(AudioSource).playOnce()  
      }
    }
    ],
    typeSpeed: 29
  },
  {
    text: `Hohoho, why I don't think I can do that for you. How about this, I will put you on the good kid list.`, // 2
    triggeredByNext: () => {
      santaNPC2.addComponentOrReplace(new AudioSource(new AudioClip('audio/Santa_16.mp3')))
      santaNPC2.getComponent(AudioSource).playOnce()  
    },
    typeSpeed: 29
  },
  {
    text: `Do give yourself a pat on the back.`, // 2
    triggeredByNext: () => {
      santaNPC2.addComponentOrReplace(new AudioSource(new AudioClip('audio/Santa_17.mp3')))
      santaNPC2.getComponent(AudioSource).playOnce()  
    },
    typeSpeed: 29
  },
  {
    text: `Have a Merry Christmas and a Happy New Year!`, // 3
    isEndOfDialog: true,
    typeSpeed: 29
  }
]


export let Dialogue2: Dialog[] = [
  {
    text: `Ohh what do we have here? Trying to give out presents again this year?`, // 0
    isEndOfDialog: true,
    
    // triggeredByNext: () => {
    //   santaNPC.addComponentOrReplace(new AudioSource(new AudioClip('audio/Grinch_2.mp3')))
    //   santaNPC.getComponent(AudioSource).playOnce()  
    // },
    typeSpeed: 16
  },
  {
    text: `What is this joyful atmosphere? It hurts my ears!`, // 1
    isEndOfDialog: true,
    // triggeredByNext: () => {
    //   santaNPC.addComponentOrReplace(new AudioSource(new AudioClip('audio/Grinch_3.mp3')))
    //   santaNPC.getComponent(AudioSource).playOnce()  
    // },
    typeSpeed: 17
  },
  {
    text: `Oh shut it Santa! Christmas is mine! Just what can you do about it?`, // 2
    isEndOfDialog: true,
    // triggeredByNext: () => {
    //   santaNPC.addComponentOrReplace(new AudioSource(new AudioClip('audio/Grinch_4.mp3')))
    //   santaNPC.getComponent(AudioSource).playOnce()  
    // },
    typeSpeed: 16
  },
  {
    text: `YOU SHALL NOT PASS!`, // 3
    isEndOfDialog: true,
    // triggeredByNext: () => {
    //   santaNPC.addComponentOrReplace(new AudioSource(new AudioClip('audio/Grinch_4_1.mp3')))
    //   santaNPC.getComponent(AudioSource).playOnce()  
    // },
    typeSpeed: 12
  },
  {
    text: `YOUU SHALLL NOT PAASS!`,
    isEndOfDialog: true,
    // triggeredByNext: () => {
    //   santaNPC.addComponentOrReplace(new AudioSource(new AudioClip('audio/Grinch_4_2.mp3')))
    //   santaNPC.getComponent(AudioSource).playOnce()  
    // },
    typeSpeed: 12
  },
  {
    text: `YOUUU SHALLL NOT ... PAAAAAAAAAAAAAAAAAAAAAA~~AAAAAAAA~~AAAAAAAAAAAAAAAASS!`,
    isEndOfDialog: true,
    // triggeredByNext: () => {
    //   santaNPC.addComponentOrReplace(new AudioSource(new AudioClip('audio/Grinch_4_3.mp3')))
    //   santaNPC.getComponent(AudioSource).playOnce()  
    // },
    typeSpeed: 20
  },
  {
    text: `You! .. You shall not pass! ... No! No no no! ... You shall not pass ... ... YOUUUUUUUUUUUUUU SHALLLLLLLLL NOOOOOOOOOT PAAAAAAASSS`, // 6
    isEndOfDialog: true,
    typeSpeed: 18
  },
  {
    text: `My trusty crows will see to it. Mhuahaha!`, 
    isEndOfDialog: true,
    typeSpeed: 18
  },
  {
    text: `But how?! Alright alright you win this time. This.. this is NOT over.`, // 8
    isEndOfDialog: true,
    typeSpeed: 18
  }
]