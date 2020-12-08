/*
  IMPORTANT: The tsconfig.json has been configured to include "node_modules/cannon/build/cannon.js"
*/
import { Ball } from "./ball"
import { Present } from "./present"
import { Dialogue1, Dialogue2, DialogueWin, GetDialogueProgress } from "./dialogues"
import { RotateSystem, SpinVel } from "./flakeRotation"; // credits: nearnshaw
//import { NPC } from '../node_modules/@dcl/npc-utils/index' // NPCs
import utils from "../node_modules/decentraland-ecs-utils/index" // ECS
import { NPC } from './npc-utils/index' // NPCs

 /* ==================
  * ======= UI =======
  * ================== */


const canvas = new UICanvas()
const rect = new UIContainerRect(canvas)
rect.adaptHeight = true
rect.adaptWidth = true
rect.hAlign = 'left'
rect.vAlign = 'bottom'
rect.opacity = 0.8

// IMAGES

class UIUpdate 
{
  tick = 0

  update(dt: number) {
    this.tick += 1

    if (this.tick % 2 == 0)
    {
      if (presentColors[mostRecentPresent+1] == 0)
      {
        presentBlueIcon.visible = true
        presentGreenIcon.visible = false
        presentRedIcon.visible = false

      } else if (presentColors[mostRecentPresent+1] == 1)
      {
        presentGreenIcon.visible = true
        presentBlueIcon.visible = false
        presentRedIcon.visible = false
      } else if (presentColors[mostRecentPresent+1] == 2)
      {
        presentRedIcon.visible = true
        presentBlueIcon.visible = false
        presentGreenIcon.visible = false
      }
    }
    
  }
}
engine.addSystem(new UIUpdate())

var upNextImg = new Texture("images/upnext.png")
var talkToSanta = new Texture("images/talk-to-santa.png")
var scoreImg = new Texture("images/score.png")
var instructions = new Texture("images/instructions.png")
var presentBlue = new Texture("images/presentBlue.png")
var presentGreen = new Texture("images/presentGreen.png")
var presentRed = new Texture("images/presentRed.png")
var countdown3 = new Texture("images/3.png")
var countdown2 = new Texture("images/2.png")
var countdown1 = new Texture("images/1.png")
var countdown0 = new Texture("images/go.png")

const upnext = new UIImage(rect, upNextImg)
upnext.hAlign = 'left'
upnext.vAlign = 'bottom'
upnext.sourceWidth = 1024
upnext.sourceHeight = 1024
upnext.width = 256
upnext.height = 256
upnext.positionX = 30
upnext.positionY = -100

const toTalkSantaImg = new UIImage(rect, talkToSanta)
toTalkSantaImg.hAlign = 'left'
toTalkSantaImg.vAlign = 'bottom'
toTalkSantaImg.sourceWidth = 512
toTalkSantaImg.sourceHeight = 512
toTalkSantaImg.width = 256
toTalkSantaImg.height = 256
toTalkSantaImg.positionX = 500
toTalkSantaImg.positionY = 400

const instructionsImg = new UIImage(rect, instructions)
instructionsImg.hAlign = 'left'
instructionsImg.vAlign = 'bottom'
instructionsImg.sourceWidth = 512
instructionsImg.sourceHeight = 512
instructionsImg.width = 512
instructionsImg.height = 512
instructionsImg.positionX = 360
instructionsImg.positionY = 135
instructionsImg.visible = false

const countdown3Img = new UIImage(rect, countdown3)
countdown3Img.hAlign = 'left'
countdown3Img.vAlign = 'bottom'
countdown3Img.sourceWidth = 512
countdown3Img.sourceHeight = 512
countdown3Img.width = 512
countdown3Img.height = 512
countdown3Img.positionX = 325
countdown3Img.positionY = 150
countdown3Img.visible = false

const countdown2Img = new UIImage(rect, countdown2)
countdown2Img.hAlign = 'left'
countdown2Img.vAlign = 'bottom'
countdown2Img.sourceWidth = 512
countdown2Img.sourceHeight = 512
countdown2Img.width = 512
countdown2Img.height = 512
countdown2Img.positionX = 325
countdown2Img.positionY = 150
countdown2Img.visible = false

const countdown1Img = new UIImage(rect, countdown1)
countdown1Img.hAlign = 'left'
countdown1Img.vAlign = 'bottom'
countdown1Img.sourceWidth = 512
countdown1Img.sourceHeight = 512
countdown1Img.width = 512
countdown1Img.height = 512
countdown1Img.positionX = 325
countdown1Img.positionY = 150
countdown1Img.visible = false

const countdown0Img = new UIImage(rect, countdown0)
countdown0Img.hAlign = 'left'
countdown0Img.vAlign = 'bottom'
countdown0Img.sourceWidth = 512
countdown0Img.sourceHeight = 512
countdown0Img.width = 512
countdown0Img.height = 512
countdown0Img.positionX = 325
countdown0Img.positionY = 150
countdown0Img.visible = false

const presentBlueIcon = new UIImage(rect, presentBlue)
presentBlueIcon.hAlign = 'left'
presentBlueIcon.vAlign = 'bottom'
presentBlueIcon.sourceWidth = 1024
presentBlueIcon.sourceHeight = 1024
presentBlueIcon.width = 256
presentBlueIcon.height = 256
presentBlueIcon.positionX = 30
presentBlueIcon.positionY = -150
presentBlueIcon.visible = false

const presentGreenIcon = new UIImage(rect, presentGreen)
presentGreenIcon.hAlign = 'left'
presentGreenIcon.vAlign = 'bottom'
presentGreenIcon.sourceWidth = 1024
presentGreenIcon.sourceHeight = 1024
presentGreenIcon.width = 256
presentGreenIcon.height = 256
presentGreenIcon.positionX = 30
presentGreenIcon.positionY = -150
presentGreenIcon.visible = false

const presentRedIcon = new UIImage(rect, presentRed)
presentRedIcon.hAlign = 'left'
presentRedIcon.vAlign = 'bottom'
presentRedIcon.sourceWidth = 1024
presentRedIcon.sourceHeight = 1024
presentRedIcon.width = 256
presentRedIcon.height = 256
presentRedIcon.positionX = 30
presentRedIcon.positionY = -150
presentRedIcon.visible = false

// Score
var scoreAmount = 0

const score = new UIImage(rect, scoreImg)
score.hAlign = 'left'
score.vAlign = 'bottom'
score.sourceWidth = 1024
score.sourceHeight = 1024
score.width = 256
score.height = 256
score.positionX = 30
score.positionY = 200

// Score Text
const scoreVal = new UIText(canvas)
scoreVal.value = String(scoreAmount)
scoreVal.fontSize = 42
scoreVal.width = 120
scoreVal.height = 30
scoreVal.hAlign = 'left'
scoreVal.vAlign = "bottom"
scoreVal.positionX = 40
scoreVal.positionY = 360






 /* ================================
  * ======= Spawning Objects =======
  * ================================ */

// Add XMAS TOwn
const XMASTown: Entity = new Entity()
XMASTown.addComponent(new GLTFShape("models/XMASTown2.glb"))
XMASTown.addComponent(new Transform({
  position: new Vector3(23.2, 2.4, 23),
  scale:new Vector3(0.65, 0.65, 0.65),
  rotation:new Quaternion(0,0,0,1)
}))
engine.addEntity(XMASTown)

// Add spinning star center of town
const XMASStar: Entity = new Entity()
XMASStar.addComponent(new GLTFShape("models/XMASStar1.glb"))
XMASStar.addComponent(new Transform({
  position: new Vector3(23.4, 3.6, 23.125),
  scale:new Vector3(0.65, 0.65, 0.65),
  rotation:new Quaternion(0,0,0,1)
}))
engine.addEntity(XMASStar)

// Get origin of main xmas tree for star particles to spawn around
var bOrigin = XMASStar.getComponent(Transform).position

// Add spinning watermill
const Watermill: Entity = new Entity()
Watermill.addComponent(new GLTFShape("models/Watermill.glb"))
Watermill.addComponent(new Transform({
  position: new Vector3(22, 2.4, 25),
  scale:new Vector3(0.65, 0.65, 0.65),
  rotation:new Quaternion(0,0,0,1)
}))
engine.addEntity(Watermill)


// Add Sleigh
const Sleigh: Entity = new Entity()
Sleigh.addComponent(new GLTFShape("models/Sleigh.glb"))
Sleigh.addComponent(new Transform({
  position: new Vector3(23.2, 2.25, 23),
  scale:new Vector3(0.65, 0.65, 0.65),
  rotation:new Quaternion(0,0,0,1)
}))









 /* ===========================
  * ======= Sleigh Ride =======
  * =========================== */


// Sleigh Ride

var animName = "santa_sleigh_ldAction.003"
Sleigh.addComponent(new Animator())
Sleigh.getComponent(Animator).addClip(new AnimationState(animName, { looping: false }))
  
let sleighRideAnim = Sleigh.getComponent(Animator).getClip(animName)
sleighRideAnim.stop()
sleighRideAnim.play()
sleighRideAnim.stop()

Sleigh.getComponent(Transform).scale = new Vector3(0.0001,0.0001,0.0001)  // Hide for now

engine.addEntity(Sleigh)

      
const camera = Camera.instance
var rideStart = false
var sleighPhase = 0

var sleighSpawned = false

class SleighRide 
{
  tick = 0
  tickSinceRideStart = 0
  tickSincePhase3 = 0
  secondsSinceRideStart = 0
  secondsSincePhase3 = 0
  secondsSinceWin = 0
  exactPhase = 0
  update(dt: number) {
    this.tick += 1

    if (GetDialogueProgress() == 1 && !sleighSpawned) // Spawn Sleigh after talking to Santa is done
    {
      sleighSpawned = true
      Sleigh.getComponent(Transform).scale = new Vector3(0.65,0.65,0.65)
      sleighRideAnim.stop()
      sleighRideAnim.play()
      sleighRideAnim.stop()

      santaNPC.getComponent(Transform).scale = new Vector3(0.0001,0.0001,0.0001) // Hide Santa for now (he's moved on the sleigh)
    }

    if (!rideStart)
    {
      sleighRideAnim.stop() // fix sleigh sometimes teleporting before we start
    }

    let x = camera.position.x
    let y = camera.position.y
    let z = camera.position.z

    if (x > 30 && x < 32 && y > 2.1 && z > 30 && z < 32 && !rideStart) // 
    // sleigh coordinates
    // 30.848209381103516, 2.2917938232421875, 31.44274139404297
    {
      log("LET THE RIDE BEGIN!")
      sleighRideAnim.play()
      sleighRideAnim.speed = 0.9
      santaNPC.talk(Dialogue1, 7, 5)

      npcTALK.addComponentOrReplace(new AudioSource(new AudioClip('audio/Santa_7.mp3'))) // 'Hang on tight now!'
      npcTALK.getComponent(AudioSource).playOnce()  

      rideStart = true

      // Change audio
      audioEnt.removeComponent(audioSource)
      var audioSource2 = new AudioSource(new AudioClip('audio/jazz_carol.mp3'))
      audioEnt.addComponent(audioSource2)
      audioSource2.playing = true
      audioSource2.loop = true
      audioSource2.volume = 0.50
      audioSource2.pitch = 1

    
    }

    if (rideStart)
    {
      this.tickSinceRideStart += 1
      this.secondsSinceRideStart += dt

      if (this.secondsSinceRideStart > 4 && sleighPhase == 0)
      {
        sleighPhase = 1 
        sleighRideAnim.speed = 1.1
      }

      if (this.secondsSinceRideStart > 6 && this.exactPhase == 0)
      {
        // Show instructions UI
        instructionsImg.visible = true
        this.exactPhase = 1
      }

      if (this.secondsSinceRideStart > 15 && this.exactPhase == 1)
      {
        this.exactPhase = 2
        instructionsImg.visible = false

        santaNPC.talk(Dialogue1, 8, 4.5)

        npcTALK.addComponentOrReplace(new AudioSource(new AudioClip('audio/Santa_8.mp3'))) // 'Go, throw the presents into the chimneys'
        npcTALK.getComponent(AudioSource).playOnce() 

      }

      // 3..2..1..Go! Text Countdown
      if (this.secondsSinceRideStart > 18 && this.exactPhase == 2)
      {
        this.exactPhase = 3
        countdown3Img.visible = true
      }

      if (this.secondsSinceRideStart > 19 && this.exactPhase == 3)
      {
        this.exactPhase = 4
        countdown3Img.visible = false
        countdown2Img.visible = true
      }

      if (this.secondsSinceRideStart > 20 && this.exactPhase == 4)
      {
        this.exactPhase = 5
        countdown2Img.visible = false
        countdown1Img.visible = true
      }

      if (this.secondsSinceRideStart > 21 && this.exactPhase == 5)
      {
        this.exactPhase = 6
        countdown1Img.visible = false
        countdown0Img.visible = true
      }

      if (this.secondsSinceRideStart > 21.5 && sleighPhase == 1  && this.exactPhase == 6)
      {
        this.exactPhase = 7
        sleighPhase = 2 // player can now shoot presents by clicking
      }

      if (this.secondsSinceRideStart > 22 && this.exactPhase == 7)
      {
        this.exactPhase = 8
        countdown0Img.visible = false

        //santaNPC.getComponent(Transform).scale = new Vector3(0.25,0.25,0.25) // Show Santa again
      }

      if (y > 10.0 && sleighPhase == 2 && this.exactPhase == 8) // pesky crows
      {
        SHOOTING_ALLOWED = false

        this.exactPhase = 9
        sleighPhase = 3

        santaNPC.talk(Dialogue1, 10, 5)

        npcTALK.getComponent(Transform).position = Camera.instance.position
        npcTALK.addComponentOrReplace(new AudioSource(new AudioClip('audio/Santa_10.mp3'))) // 'Here comes the pesky villains!'
        npcTALK.getComponent(AudioSource).playOnce() 
        

        // Change audio
        audioEnt.getComponent(AudioSource).playing = false
        audioEnt.removeComponent(audioSource)
        var audioSource2 = new AudioSource(new AudioClip('audio/silent_dark_night.mp3'))
        audioEnt.addComponent(audioSource2)
        audioSource2.playing = true
        audioSource2.loop = true
        audioSource2.volume = 0.50
        audioSource2.pitch = 1

        // Slow down animation of sleigh
        sleighRideAnim.speed = 0.1
        
      } 

      if (sleighPhase == 3)
      {
        this.tickSincePhase3 +=1
        this.secondsSincePhase3 += dt
      }

      
      if (this.secondsSincePhase3 > 5 && sleighPhase == 3 && this.exactPhase == 9)
      {

        this.exactPhase = 10
        grinchNPC.talk(Dialogue2, 0, 7.5)

        npcTALK.getComponent(Transform).position = Camera.instance.position
        npcTALK.addComponentOrReplace(new AudioSource(new AudioClip('audio/Grinch_1.mp3'))) // 'Ohh what do we have here? Trying to give out presents again this year?'
        npcTALK.getComponent(AudioSource).playOnce()  
      }

      if (this.secondsSincePhase3 > 13.5 && sleighPhase == 3 && this.exactPhase == 10)
      {
        this.exactPhase = 11
        grinchNPC.talk(Dialogue2, 1, 5.5)

        npcTALK.getComponent(Transform).position = Camera.instance.position
        npcTALK.addComponentOrReplace(new AudioSource(new AudioClip('audio/Grinch_2.mp3'))) // 'What is with this joyful atmosphere? It hurts my ears!'
        npcTALK.getComponent(AudioSource).playOnce()  
      }

      if (this.secondsSincePhase3 > 20.5 && sleighPhase == 3 && this.exactPhase == 11)
      {
        this.exactPhase = 12
        santaNPC.talk(Dialogue1, 12, 3.5)

        npcTALK.getComponent(Transform).position = Camera.instance.position
        npcTALK.addComponentOrReplace(new AudioSource(new AudioClip('audio/Santa_12.mp3'))) // 'How poetic!'
        npcTALK.getComponent(AudioSource).playOnce()  
      }

      if (this.secondsSincePhase3 > 25.5 && sleighPhase == 3 && this.exactPhase == 12)
      {
        this.exactPhase = 13
        grinchNPC.talk(Dialogue2, 2, 8.5)

        npcTALK.getComponent(Transform).position = Camera.instance.position
        npcTALK.addComponentOrReplace(new AudioSource(new AudioClip('audio/Grinch_3.mp3'))) // 'Oh shut it Santa! Christmas is mine! Just what can you do about it?'
        npcTALK.getComponent(AudioSource).playOnce()  
      }

      if (this.secondsSincePhase3 > 34.5 && sleighPhase == 3 && this.exactPhase == 13)
      {
        this.exactPhase = 14
        grinchNPC.talk(Dialogue2, 6, 14)

        npcTALK.getComponent(Transform).position = Camera.instance.position
        npcTALK.addComponentOrReplace(new AudioSource(new AudioClip('audio/Grinch_4_3.mp3'))) // 'You! .. You shall not pass! ... No! No no no! ...'
        npcTALK.getComponent(AudioSource).playOnce()  
      }
 
      if (this.secondsSincePhase3 > 50 && sleighPhase == 3 && this.exactPhase == 14)
      {
        this.exactPhase = 15
        grinchNPC.talk(Dialogue2, 7, 9)

        npcTALK.getComponent(Transform).position = Camera.instance.position
        npcTALK.addComponentOrReplace(new AudioSource(new AudioClip('audio/Grinch_5.mp3'))) // 'My trusty crows will see to it. Mhuahaha!'
        npcTALK.getComponent(AudioSource).playOnce()  

        // Spawn crows
        for (let i = 0; i < 5; i++) {
          Ravens[i].addComponent(new GLTFShape("models/Raven.glb"))
          Ravens[i].addComponent(new Transform({
            position: RavenLocations[i],
            scale:new Vector3(1, 1, 1),
            rotation:new Quaternion(0,.5,0,1)
          }))
          engine.addEntity(Ravens[i]) 
        }

      }

      if (this.secondsSincePhase3 > 58 && sleighPhase == 3 && this.exactPhase == 15)
      {
        SHOOTING_ALLOWED = true 

        this.exactPhase = 16
        sleighPhase = 4

        santaNPC.talk(Dialogue1, 11, 6)

        npcTALK.addComponentOrReplace(new AudioSource(new AudioClip('audio/Santa_11.mp3'))) // 'We've prepared some special presents for them. Knock 'em down!'
        npcTALK.getComponent(AudioSource).playOnce()  
        
      }

      if (sleighPhase == 4 && RAVEN_DEAD[0] && RAVEN_DEAD[1] && RAVEN_DEAD[2] && RAVEN_DEAD[3] && RAVEN_DEAD[4] && this.exactPhase == 16)
      {
        this.exactPhase = 17
        grinchNPC.talk(Dialogue2, 8, 10)

        npcTALK.addComponentOrReplace(new AudioSource(new AudioClip('audio/Grinch_6.mp3'))) // 'But how?! Alright alright you win this time. This.. this is NOT over.'
        npcTALK.getComponent(AudioSource).playOnce()  

        sleighRideAnim.speed = 1.1 // speed up sleigh animation again
        SHOOTING_ALLOWED = false

      }

      if (this.exactPhase >= 17)
      {
        this.secondsSinceWin += dt
      }

      if (this.exactPhase == 17 && this.secondsSinceWin > 9)
      {
        this.exactPhase = 18

        audioEnt.removeComponent(audioSource)
        var audioSource2 = new AudioSource(new AudioClip('audio/we_wish_theme.mp3'))
        audioEnt.addComponent(audioSource2)
        audioSource2.playing = true
        audioSource2.loop = true
        audioSource2.volume = 0.40
        audioSource2.pitch = 1

      }


      if (this.exactPhase == 18 && this.secondsSinceWin > 14)
      {
        this.exactPhase = 19

        //Sleigh.getComponent(Transform).scale = new Vector3(0.0001,0.0001,0.0001)  // Hide for now

        engine.removeEntity(Sleigh)   // Remove Sleigh
        engine.removeEntity(santaNPC) // Remove old Santa

        santaNPC2 = new NPC(
          { position: new Vector3(22, 0, 27), scale: new Vector3(0.25, 0.25, 0.25), rotation: new Quaternion(0,0,0,1)}, 
          'models/Santa.glb', 
          
          () => {
            santaNPC2.talk(DialogueWin, 0)
          },
          {
            darkUI: true,
            reactDistance: 1,
            hoverText: "Celebrate with Santa",
            portrait: { path: 'images/portrait_santa.png', height: 256, width: 256 }
          }
        )
        
        santaNPC2.playAnimation('SantaDance.001', false, 1000)

        santaNPC2.getComponent(Transform).position = new Vector3(22, 0, 27) // Add dancing celebrating santa NPC

      }



    }

  }
}

engine.addSystem(new SleighRide())










 /* ============================
  * ======= Crows/Ravens =======
  * ============================ */

// --------

// Spawn Crows/Ravens

const Ravens: Entity[] =
[
  new Entity(),
  new Entity(),
  new Entity(),
  new Entity(),
  new Entity()
]

//  Raven Locations
var RavenLocations: Vector3[] = 
[
  new Vector3(24, 13, 24),
  new Vector3(21, 13, 27),
  new Vector3(18, 13, 30),
  new Vector3(15, 13, 27),
  new Vector3(12, 13, 24)
]




 /* =====================
  * ======= Trees =======
  * ===================== */

//

const LitTree: Entity[] =
[
  new Entity(),
  new Entity(),
  new Entity(),
  new Entity(),
  new Entity(),
  new Entity(),
  new Entity()
]

const UnlitTree: Entity[] =
[
  new Entity(),
  new Entity(),
  new Entity(),
  new Entity(),
  new Entity(),
  new Entity(),
  new Entity()
]

// Add trees
var LitTreeLocations: Vector3[] = 
[
  new Vector3(17, 2.3, 17), 
  new Vector3(44, 2.3, 16),
  new Vector3(38, 2.3, 41),
  new Vector3(22, 2.3, 34), 
  new Vector3(10, 2.3, 33)
]

var UnlitTreeLocations: Vector3[] = 
[
  new Vector3(26.5, 2.3, 8), 
  //new Vector3(32, 2.3, 32),
  new Vector3(3, 2.3, 24),
  new Vector3(6, 2.3, 38),
  new Vector3(38, 2.3, 26),
  new Vector3(24.8, 2.3, 40.7),
  new Vector3(45.5, 2.3, 21.7)
]

// Spawn Animated Lit Trees
for (let i = 0; i < 5; i++) {
  LitTree[i].addComponent(new GLTFShape("models/SwayingLitTree.glb"))
  LitTree[i].addComponent(new Transform({
    position: LitTreeLocations[i],
    scale:new Vector3(0.65, 0.65, 0.65),
    rotation:new Quaternion(0,0,0,1)
  }))
  engine.addEntity(LitTree[i]) 
}

// Spawn Animated UnLit Trees
for (let i = 0; i < 6; i++) {
  UnlitTree[i].addComponent(new GLTFShape("models/SwayingUnlitTree.glb"))
  UnlitTree[i].addComponent(new Transform({
    position: UnlitTreeLocations[i],
    scale:new Vector3(0.65, 0.65, 0.65),
    rotation:new Quaternion(0,0,0,1)
  }))
  engine.addEntity(UnlitTree[i]) 
}





 /* ========================
  * ======= Chimneys =======
  * ======================== */


const Chimneys: Entity[] =
[
  new Entity(),
  new Entity(),
  new Entity(),
  new Entity(),
  new Entity(),
  new Entity(),
  new Entity(),
  new Entity(),
  new Entity()
]

//  Chimney Locations
var ChimneyLocations: Vector3[] = 
[
  new Vector3(42.5, 1.9, 32),   // green 0
  new Vector3(32, 2, 39),     // RED 1
  new Vector3(17.5, 2, 44.5), // blue 2
  new Vector3(4, 2.5, 29),      // green 3
  new Vector3(6.9, 2.1, 19.8),    // red 4
  new Vector3(11, 2, 12),      // blue 5
  new Vector3(17, 1.3, 6),      // green 6
  new Vector3(33, 2, 6),      // RED 7 
  new Vector3(41, 2, 11)     // BLUE 8 
]


class SpawnChimneys
{
  tick = 0
  update(dt: number) {
    this.tick += 1
    if (this.tick == 100) // Spawn on 100th tick
    {
      // 2020 DCL Text Blinking Signs


      for (let i = 0; i < 9; i++) {
        var t = "models/Chimney" + String(i) + ".glb"
        Chimneys[i].addComponent(new GLTFShape(t))
        Chimneys[i].addComponent(new Transform({
          position: new Vector3(ChimneyLocations[i].x, ChimneyLocations[i].y + 0, ChimneyLocations[i].z)
        }))
        
        engine.addEntity(Chimneys[i]) 
      

      }
    }
  }
}

engine.addSystem(new SpawnChimneys())







 /* ================================
  * ============ NPCs ==============
  * ================================ */

 export let santaNPC = new NPC(
	{ position: new Vector3(32.5, 0, 26.5), scale: new Vector3(0.25, 0.25, 0.25), rotation: new Quaternion(0,2,0,1)}, 
  'models/Santa.glb', 
  
	() => {
    santaNPC.talk(Dialogue1, 0)
    toTalkSantaImg.visible = false
  },
  {
    darkUI: true,
    hoverText: "Talk to Santa",
    reactDistance: 2,
    portrait: { path: 'images/portrait_santa.png', height: 256, width: 256 }
  }
)

santaNPC.playAnimation('SantaIdle', false, 1000)



// Santa NPC (after you win version)
export var santaNPC2




export let grinchNPC = new NPC(
	{ position: new Vector3(40, -0.2, 40), scale: new Vector3(0.5, 0.5, 0.5)}, 
  'models/MountainNPCTest.glb', 
  
	() => {
    grinchNPC.talk(Dialogue2, 0)
  },
  {
    darkUI: true,
    reactDistance: 0.1,
    hoverText: "Poke The Greench Hiding Under Pile of Snow",
    portrait: { path: 'images/portrait_greench.png', height: 256, width: 256 }
  }
)






 /* ================================
  * ============ Audio =============
  * ================================ */

// Add audio BGM
var audioEnt = new Entity("AudioSource")
engine.addEntity(audioEnt)
audioEnt.addComponent(new Transform())
audioEnt.getComponent(Transform).position = Camera.instance.position
audioEnt.getComponent(Transform).rotation.set(0, 0, 0, 1)
audioEnt.getComponent(Transform).scale.set(1, 1, 1)


// pop_carol, silent_dark_night, we_wish_theme
var audioSource = new AudioSource(new AudioClip('audio/Jingle_Bells_Kevin_MacLeod_Royalty_Free.mp3'))
var playAudioSource1 = () => {
  audioEnt.addComponent(audioSource)
  audioSource.playing = true
  audioSource.loop = true
  audioSource.volume = 0.50
  audioSource.pitch = 1
}

const scoreSound = new Entity()
scoreSound.addComponent(new AudioSource(new AudioClip("audio/ding_1.mp3")))
scoreSound.addComponent(new Transform())
scoreSound.getComponent(Transform).position = Camera.instance.position
engine.addEntity(scoreSound)

const crowSound = new Entity()
crowSound.addComponent(new AudioSource(new AudioClip("audio/crow.mp3")))
crowSound.addComponent(new Transform())
crowSound.getComponent(Transform).position = Camera.instance.position
engine.addEntity(crowSound)


const npcTALK = new Entity()
npcTALK.addComponent(new AudioSource(new AudioClip("audio/santa_1.mp3")))
npcTALK.addComponent(new Transform())
npcTALK.getComponent(Transform).position = Camera.instance.position
engine.addEntity(npcTALK)


export class AutoPlayUnityAudio implements ISystem {
  activate() {
    playAudioSource1()
  }
}





 /* =======================================
  * ====== Blinking Lightbulb System ======
  * ======================================= */

  @Component('bulb')
  class Bulb {
    life = Math.random()
    seed = Math.random() - Math.random()
    toggle = 0
    constructor(public origin: Vector3, public id: float) {}
  }

  class BlinkingBulbSystem 
  {
    tick = 0
    counter = 0
    update(dt: number) {
      this.tick += 1
      if (this.tick >= 32 && this.tick % 4 == 0 && this.counter < this.bbs_count)
      {
        this.counter += 1
        var count = this.bbs_count;
        var angle = this.counter * Math.PI * 2 / count;
        var newPos = new Vector3(Math.cos(angle) * this.bbs_radius, -2, Math.sin(angle) * this.bbs_radius)
        var offsetPos = new Vector3(this.bbs_origin.x + newPos.x, this.bbs_origin.y + newPos.y, this.bbs_origin.z + newPos.z)
    
        const bulb = new Entity()
        bulb.addComponent(new Bulb(offsetPos, this.counter))
        if (this.counter % 2 == 0)
          bulb.addComponent(new GLTFShape("models/BlinkingGreenBulb.glb"))
        else
          bulb.addComponent(new GLTFShape("models/BlinkingRedBulb.glb"))

        bulb.addComponent(
            new Transform({ position: offsetPos, scale: new Vector3(0.15, 0.15, 0.15) })
        )
        engine.addEntity(bulb)
        bulbs.push(bulb)
      }
    }
    constructor(public bbs_origin: Vector3, public bbs_radius: float, public bbs_count: number) {}
  }

  const bulbs: Entity[] = []

  const b_origin0 = new Vector3(bOrigin.x + 1.25, bOrigin.y + 4.30, bOrigin.z + 0.25)
  const b_radius0 = 1.8
  
  const b_origin1 = new Vector3(bOrigin.x + 1.25, bOrigin.y + 3.10, bOrigin.z + 0.25)
  const b_radius1 = 2.2

  const b_origin2 = new Vector3(bOrigin.x + 1.25, bOrigin.y + 1.75, bOrigin.z + 0.25)
  const b_radius2 = 2.6

  const b_origin3 = new Vector3(bOrigin.x + 1.25, bOrigin.y + 0.75, bOrigin.z + 0.25)
  const b_radius3 = 3.0

  engine.addSystem(new BlinkingBulbSystem(b_origin0, b_radius0, 16))
  engine.addSystem(new BlinkingBulbSystem(b_origin1, b_radius1, 24))
  engine.addSystem(new BlinkingBulbSystem(b_origin2, b_radius2, 32))
  engine.addSystem(new BlinkingBulbSystem(b_origin3, b_radius3, 40))





  /* ========================
  * ====== Snow System ======
  * ========================= */

  engine.addSystem(new RotateSystem())

  // Snowing!
  @Component('snowflake')
  class Snowflake {
    seed = Math.random() - Math.random()
    previousYPos = 0
    constructor(public id: number) {}
  }

  class SnowflakeLoop 
  {
    mainCamera = Camera.instance
    tick = 0
    totalSnowCount = 0
    group = engine.getComponentGroup(Snowflake)

    update(dt: number) {
      this.tick += 1
      
      // if (this.tick % 64 == 0) // Once per 64 updates
      // {
      //   log("Player position: " + this.mainCamera.position)
      // }

      // Spawn new snow per 4 ticks (up to 125)
      if (this.tick % 4 == 0 && this.totalSnowCount <= 125)
      {
        this.totalSnowCount += 1

        var newX = GetRandomInBoundPosNearPlayer(15, 0) // radius 15, axis 0 = x
        var newY = this.mainCamera.position.y + 15 // 15 above the player
        var newZ = GetRandomInBoundPosNearPlayer(15, 2) // radius 15, axis 2 = z

        const flake = new Entity()
        flake.addComponent(new GLTFShape("models/Snowflake.glb"))
        flake.addComponent(new Transform({ position: new Vector3(newX,newY,newZ), scale: new Vector3(0.5, 0.5, 0.5) }))
        flake.addComponent(new Snowflake(this.totalSnowCount))
        
        if (this.totalSnowCount % 3 != 0) // add billboard to 2/3 of snowflakes
          flake.addComponent(f_billboard)
    
        const flakeSpin = new Vector3(
          Math.random() * 10,
          Math.random() * 90,
          Math.random() * 10
        )
      
        const flakeSpeed = Math.random() * 5
      
        flake.addComponent(new SpinVel(flakeSpin, flakeSpeed))
    
        engine.addEntity(flake)
        flakes.push(flake)

      }


      for (const entity of this.group.entities) 
      {
        const snow = entity.getComponent(Snowflake)
        const transform = entity.getComponent(Transform)

        transform.position.y -= (0.1 + (snow.seed/15))
        
        // Set 2/3 of snowflakes to random position near player (most snow spawns closer to player for performance reasons)
        if (transform.position.y < -1 && snow.id % 3 != 0) // If snowflake is underground, reset it
        {
          const negOneToOne = (2 * (Math.random() % (1 + 1 - (-1))) + (-.5));
         
          // New value
          var newX = GetRandomInBoundPosNearPlayer(15, 0) // radius 15, axis 0 = x
          var newY = this.mainCamera.position.y + 20 + (negOneToOne * 1 ) // random fluction of -1 to 1
          var newZ = GetRandomInBoundPosNearPlayer(15, 2) // radius 15, axis 2 = z

          transform.position = new Vector3(newX, newY, newZ)
        } else if (transform.position.y < -1 && snow.id % 3 == 0) // Set 1/3 of snowflakes to random in-bound position
        {
          const negOneToOne = (2 * (Math.random() % (1 + 1 - (-1))) + (-.5));
         
          // New value
          var newX = 5 + (Math.random() * 38) // from 5-43 (padding of 5 on each boundary)
          var newY = this.mainCamera.position.y + 20 + (negOneToOne * 1 ) // random fluction of -1 to 1
          var newZ = 5 + (Math.random() * 38) // from 5-43 (padding of 5 on each boundary)
 
          transform.position = new Vector3(newX, newY, newZ)          
        }
        

        snow.previousYPos = transform.position.y // Update pos
      }

    }
  }
  
  const f_billboard = new Billboard()
  var mainCamera = Camera.instance
  var posX = mainCamera.position.x
  var posY = mainCamera.position.y
  var posZ = mainCamera.position.z

  const flakes: Entity[] = []

  for (let i = 0; i < 1; i++) {
    const flake = new Entity()
    flake.addComponent(new GLTFShape("models/Snowflake.glb"))
    flake.addComponent(new Transform({ position: new Vector3(15,20,15), scale: new Vector3(0.5, 0.5, 0.5) }))
    flake.addComponent(new Snowflake(i))
    flake.addComponent(f_billboard)

    const flakeSpin = new Vector3(
      Math.random() * 30,
      Math.random() * 30,
      Math.random() * 30
    )
  
    const flakeSpeed = Math.random() * 2
  
    flake.addComponent(new SpinVel(flakeSpin, flakeSpeed))

    engine.addEntity(flake)
    flakes.push(flake)
  }

  engine.addSystem(new SnowflakeLoop())






 /* ================================
  * ====== Particle System =========
  * ================================ */

  @Component('particle')
  class Particle {
    life = Math.random()
    seed = Math.random() - Math.random()
    constructor(public origin: Vector3) {}
  }

  let fireHeight = 0

  class ParticleSystem {
    tick = 0
    totalParticleCount = 0

    group = engine.getComponentGroup(Particle)
    update(dt: number) 
    {
      this.tick += 1
    
      // Spawn new particles per 8 ticks (up to 25)
      if (this.tick % 8 == 0 && this.totalParticleCount <= 25)
      {
        this.totalParticleCount += 1

        const particle = new Entity()
        particle.addComponent(s_shape)
        particle.addComponent(s_billboard)
        particle.addComponent(myMaterial)
        particle.addComponent(new Particle(s_origin))
        particle.addComponent(
            new Transform({ position: s_origin, scale: new Vector3(0.65, 0.65, 0.65) })
        )
        engine.addEntity(particle)
        particles.push(particle)
      }
    

      if (true) {
        fireHeight = fireHeight + (2 - fireHeight) / 10
        s_shape.visible = true
        for (const entity of this.group.entities) 
        {
            const particle = entity.getComponent(Particle)
            const transform = entity.getComponent(Transform)
            const currentMaterial = (particle.life * 10) | 0
            particle.life += dt*0.05
            particle.life %= 1
            const radius = 3.4
            transform.position = new Vector3(
            particle.origin.x +
                Math.sin((particle.life + particle.seed) * 5) *
                (1 - particle.life / 1.3) *
                radius,
            particle.origin.y + particle.life * fireHeight * 3.25,
            particle.origin.z +
                Math.cos((particle.life + particle.seed) * 5) *
                (1 - particle.life / 1.3) *
                radius
            )
            const scale = 0.02 + particle.life / 7
            transform.scale = new Vector3(scale, scale, scale)
            transform.rotation = Quaternion.Euler(0,0,particle.life * 360 + particle.seed * 360)
            const nextMaterial = (particle.life * 10) | 0

        }
      } else {
        fireHeight = 0
        s_shape.visible = false
      }
    }
  }

  const particles: Entity[] = []
  const s_origin = new Vector3(bOrigin.x + 1.25, bOrigin.y - 3.25, bOrigin.z + 0.25)
  const s_shape = new PlaneShape()
  const s_billboard = new Billboard()

  const myTexture = new Texture("materials/Star2.png")
  const particleColor = new Color3(1, 1, 0.5)
  const myMaterial = new Material()
  myMaterial.albedoTexture = myTexture
  myMaterial.albedoColor = particleColor;
  myMaterial.emissiveColor = particleColor;
  myMaterial.emissiveIntensity = 3

  for (let i = 0; i < 1; i++) {
    const particle = new Entity()
    particle.addComponent(s_shape)
    particle.addComponent(s_billboard)
    particle.addComponent(myMaterial)
    particle.addComponent(new Particle(s_origin))
    particle.addComponent(
        new Transform({ position: s_origin, scale: new Vector3(0.5, 0.5, 0.5) })
    )
    engine.addEntity(particle)
    particles.push(particle)
    
  }

  engine.addSystem(new ParticleSystem())

  // === End of Particle System ===







 /* ================================
  * ======= Helper Functions =======
  * ================================ */

// Tested scene bounds (each parcel is 16x16, so 3x3 parcel is 48x48)
// Height limit is log2(n+1) x 20 (n = # of parcels)
// Height limit in this 3x3 (9 parcel) bound is 66.43
// Thus, a 3x3 area is 48x66x48
// I subtract 5 for leeway x/y/z (width/length), as some objects may extrude farther than its origin
function inBounds(x: number, y: number, z: number)
{
    if (x < 6 || x > 43 || y > 61 || z < 6 || z > 43)
        return false
    return true
}

function inBoundsX(x: number)
{
  if (x < 6 || x > 43)
    return false
  return true
}

function inBoundsY(y: number)
{
  if (y > 61)
    return false
  return true
}

function inBoundsZ(z: number)
{
  if (z < 6 || z > 43)
    return false
  return true
}

function GetRandomInBoundPosNearPlayer(radius: number, axis: number)
{
  const mCam = Camera.instance
  var notInBounds = true

  // -1 to 1
  var negOneToOne = (2 * (Math.random() % (1 + 1 - (-1))) + (-.5));
    
  while (notInBounds)
  {
    if (axis == 0)
    {
      var newVal = mCam.position.x + (negOneToOne * radius)
      if (inBoundsX(newVal))
        notInBounds = false
      else
      {
        radius += 2 // expand the random radius until we find an in-bound random value
        negOneToOne = (2 * (Math.random() % (1 + 1 - (-1))) + (-.5));
      }
    }
    else if (axis == 1)
    {
      var newVal = mCam.position.y + (negOneToOne * radius)
      if (inBoundsY(newVal))
        notInBounds = false
      else
      {
        radius += 2
        negOneToOne = (2 * (Math.random() % (1 + 1 - (-1))) + (-.5));
      }
    }
    else if (axis == 2)
    {
      var newVal = mCam.position.z + (negOneToOne * radius)
      if (inBoundsZ(newVal))
        notInBounds = false
      else
      {
        radius += 2
        negOneToOne = (2 * (Math.random() % (1 + 1 - (-1))) + (-.5));
      }
    }
  }
  return newVal
}






 /* ================================
  * ======= Kickable Snowmen =======
  * ================================ */

// Kickable snowmen
const ballShapes: GLTFShape[] = [
  new GLTFShape("models/Snowman.glb"),
  new GLTFShape("models/Snowman.glb")
]

const balls: Ball[] = [] // Store balls
const ballBodies: CANNON.Body[] = [] // Store ball bodies
let ballHeight = 2 // Start height for the balls
let forwardVector: Vector3 = Vector3.Forward().rotate(Camera.instance.rotation) // Camera's forward vector
let vectorScale: number = 40

// Create random balls and positions
for (let i = 0; i < ballShapes.length; i++) {
  let randomPositionX: number = 15 + (Math.random() * 10)
  let randomPositionY: number = ballHeight
  let randomPositionZ: number = 15 + (Math.random() * 10)

  const ball = new Ball(
    ballShapes[i],
    new Transform({
      position: new Vector3(randomPositionX, randomPositionY, randomPositionZ),
    })
  )
  balls.push(ball)
  ballHeight += 2 // To ensure the colliders aren't intersecting when the simulation starts

  // Allow the user to interact with the ball
  ball.addComponent(
    new OnPointerDown(
      () => {
        ballBodies[i].applyImpulse(
          new CANNON.Vec3(forwardVector.x * vectorScale, forwardVector.y * vectorScale, forwardVector.z * vectorScale),
          new CANNON.Vec3(ballBodies[i].position.x, ballBodies[i].position.y, ballBodies[i].position.z)
        )
      },
      {
        button: ActionButton.ANY,
        showFeedback: true,
        hoverText: "kick",
      }
    )
  )
}

// Setup our world
const world: CANNON.World = new CANNON.World()
world.gravity.set(0, -9.82, 0) // m/s²

const groundPhysicsMaterial = new CANNON.Material("groundMaterial")
const groundPhysicsContactMaterial = new CANNON.ContactMaterial(groundPhysicsMaterial, groundPhysicsMaterial, {
  friction: 0.5,
  restitution: 0.33,
})
world.addContactMaterial(groundPhysicsContactMaterial)

// Create a ground plane and apply physics material
const groundBody: CANNON.Body = new CANNON.Body({
  mass: 0, // mass == 0 makes the body static
})
groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2) // Reorient ground plane to be in the y-axis

const groundShape: CANNON.Plane = new CANNON.Plane()
groundBody.addShape(groundShape)
groundBody.material = groundPhysicsMaterial
world.addBody(groundBody)

const ballPhysicsMaterial: CANNON.Material = new CANNON.Material("ballMaterial")
const ballPhysicsContactMaterial = new CANNON.ContactMaterial(groundPhysicsMaterial, ballPhysicsMaterial, {
  friction: 0.4,
  restitution: 0.75,
})
world.addContactMaterial(ballPhysicsContactMaterial)

// Create bodies to represent each of the balls
for (let i = 0; i < balls.length; i++) {
  let ballTransform: Transform = balls[i].getComponent(Transform)

  const ballBody: CANNON.Body = new CANNON.Body({
    mass: 5, // kg
    position: new CANNON.Vec3(ballTransform.position.x, ballTransform.position.y, ballTransform.position.z), // m
    shape: new CANNON.Sphere(1), // m (Create sphere shaped body with a radius of 1)
  })

  ballBody.material = ballPhysicsMaterial // Add bouncy material to ball body
  ballBody.linearDamping = 0.4 // Round will keep translating even with friction so you need linearDamping
  ballBody.angularDamping = 0.4 // Round bodies will keep rotating even with friction so you need angularDamping

  world.addBody(ballBody) // Add body to the world
  ballBodies.push(ballBody)
}

const fixedTimeStep: number = 1.0 / 60.0 // seconds
const maxSubSteps: number = 3

class updateSystem implements ISystem {
  update(dt: number): void {
    // Instruct the world to perform a single step of simulation.
    // It is generally best to keep the time step and iterations fixed.
    world.step(fixedTimeStep, dt, maxSubSteps)

    // Position and rotate the balls in the scene to match their cannon world counterparts
    for (let i = 0; i < balls.length; i++) {
      balls[i].getComponent(Transform).position.copyFrom(ballBodies[i].position)
      balls[i].getComponent(Transform).rotation.copyFrom(ballBodies[i].quaternion)
    }

    // Update forward vector
    forwardVector = Vector3.Forward().rotate(Camera.instance.rotation)
    //log("Forward Vector: ", forwardVector)
  }
}

engine.addSystem(new updateSystem())











 /* ================================
  * === Shooting Presents System ===
  * ================================ */

// Shooting Presents!!!

// Presents Globals
var shotPresent = false
var presents: Entity[] = []
var physicsBodies: CANNON.Body[] = []
var currentPresentCount = 0
var mostRecentPresent = -1
var firstFire = true

// Present and setting
const X_OFFSET = 0
const Y_OFFSET = -0.75
const Z_OFFSET = 1

// Ground
const groundMaterial = new CANNON.Material("groundMaterial")
const groundContactMaterial = new CANNON.ContactMaterial(groundMaterial, groundMaterial, { friction: 0, restitution: 0.33 })
world.addContactMaterial(groundContactMaterial)

// Config
const SHOOT_VELOCITY = 45
const FIXED_TIME_STEPS = 1.0 / 60.0 // seconds
const MAX_TIME_STEPS = 3

const COOLDOWN_BETWEEN_SHOOTING_PRESENTS = 16 // In frames


// WALLS

// Invisible walls for throwing presents (bounds of 3x3 LAND)
const wallShape = new CANNON.Box(new CANNON.Vec3(24, 50, 0.5))
const wallNorth = new CANNON.Body({
  mass: 0,
  shape: wallShape,
  position: new CANNON.Vec3(24, 49.5, 48),
})
world.addBody(wallNorth)

const wallSouth = new CANNON.Body({
  mass: 0,
  shape: wallShape,
  position: new CANNON.Vec3(24, 49.5, 0),
})
world.addBody(wallSouth)

const wallEast = new CANNON.Body({
  mass: 0,
  shape: wallShape,
  position: new CANNON.Vec3(48, 49.5, 24),
})
wallEast.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), -Math.PI / 2)
world.addBody(wallEast)

const wallWest = new CANNON.Body({
  mass: 0,
  shape: wallShape,
  position: new CANNON.Vec3(0, 49.5, 24),
})
wallWest.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), -Math.PI / 2)
world.addBody(wallWest)
// -----





// Pre-generate 2020 random presents!
var presentColors: number[] = []
for (let i = 0; i < 2020; i++) {
  const randVal = Math.random() 
  if (randVal <= 0.333)
  {
    presentColors[i] = 0
  } else if (randVal > 0.333 && randVal <= 0.666)
  {
    presentColors[i] = 1
  } else {
    presentColors[i] = 2
  }
}

function createPresent(): void {
  // New Present
  const present = new Entity()
  present.addComponent(new Transform({ position: new Vector3(X_OFFSET, Y_OFFSET, Z_OFFSET), scale:new Vector3(3.2, 3.2, 3.2)}))
  present.addComponent(new Present(new Vector3(present.getComponent(Transform).position.x,present.getComponent(Transform).position.y,present.getComponent(Transform).position.z)))

  // Random color
  mostRecentPresent += 1
  present.getComponent(Present).id = mostRecentPresent

  if (presentColors[mostRecentPresent] == 0)
  {
    present.addComponent(new GLTFShape("models/Present_Blue.glb"))
    present.getComponent(Present).colorIndex = 0
  } else if (presentColors[mostRecentPresent] == 1)
  {
    present.addComponent(new GLTFShape("models/Present_Green.glb"))
    present.getComponent(Present).colorIndex = 1
  } else if (presentColors[mostRecentPresent] == 2)
  {
    present.addComponent(new GLTFShape("models/Present_Red.glb"))
    present.getComponent(Present).colorIndex = 2
  }

  // Create Present physics
  let presentBody = present.getComponent(Present).presentBody

  const presentPhysicsMaterial: CANNON.Material = new CANNON.Material("presentMaterial")
  const presentPhysicsContactMaterial = new CANNON.ContactMaterial(groundMaterial, presentPhysicsMaterial, {
    friction: 0.0,
    restitution: 0.8,
  })
  world.addContactMaterial(presentPhysicsContactMaterial)

  presentBody.material = presentPhysicsMaterial // Add bouncy material to present body
  presentBody.linearDamping = 0.4   // Round bodies will keep translating even with friction so you need linearDamping
  presentBody.angularDamping = 0.4  // Round bodies will keep rotating even with friction so you need angularDamping

  world.addBody(presentBody) // Add body to the world

  engine.addEntity(present) // add to engine
  presents.push(present) // add to presents group

  present.setParent(Attachable.FIRST_PERSON_CAMERA)

}

var SHOOTING_ALLOWED = true

class PresentsShootLoop 
{
  tick = 0
  tickSinceShot = 0
  presentsShot = 0

  update(dt: number) {
    this.tick += 1

    if (shotPresent)
    {
      this.tickSinceShot += 1
    }

    if (this.tickSinceShot >= COOLDOWN_BETWEEN_SHOOTING_PRESENTS && SHOOTING_ALLOWED)
    {
      createPresent()
      this.tickSinceShot = 0
      this.presentsShot += 1
      shotPresent = false
    }

    if (this.presentsShot == 0 && this.tickSinceShot == 0 && sleighPhase == 2)
    {
      createPresent()
      this.tickSinceShot = 0
      this.presentsShot += 1
      shotPresent = false
    }
    
  }
}
engine.addSystem(new PresentsShootLoop())


// SHOOTING AND SCORING

function distanceVector( v1, v2 )
{
    var dx = v1.x - v2.x;
    var dy = v1.y - v2.y;
    var dz = v1.z - v2.z;

    return Math.sqrt( dx * dx + dy * dy + dz * dz );
}


const DISTANCE_TO_SCORE_THRESHOLD = 5.0
const CHIMNEY_GROW_DURATION = 0.25 // Chimney 'sucks' in present by temporarily growing, how long is the "grow/shrink"? (actual value 2x this since it grows and shrinks)
let StartSize = new Vector3(1, 1, 1)
let EndSize = new Vector3(1.2, 1.2, 1.2)
var RAVEN_DEAD: boolean[] = [false,false,false,false,false]


class presentShootSystem {

  group = engine.getComponentGroup(Present)
  tick = 0
  
  update(dt: number): void {
    this.tick += 1

    world.step(FIXED_TIME_STEPS, dt, MAX_TIME_STEPS)

    for (const entity of this.group.entities) 
    {
      
      const present = entity.getComponent(Present)
      const transform = entity.getComponent(Transform)
      const presentBody = present.presentBody

      if (present.id < currentPresentCount)
      {
        transform.position.copyFrom(presentBody.position)
        present.life -= dt
      }

      if (present.life <= 0)
      {
        engine.removeEntity(entity)
      }

      if (this.tick % 4 == 0) // since multiple distance calculations are expensive to perform, check every 4 ticks
      {
        // RAVENS
        // check for killing ravens
        if (sleighPhase == 4)
        {
          var dist1 = distanceVector(transform.position, RavenLocations[0])
          var dist2 = distanceVector(transform.position, RavenLocations[1])
          var dist3 = distanceVector(transform.position, RavenLocations[2])
          var dist4 = distanceVector(transform.position, RavenLocations[3])
          var dist5 = distanceVector(transform.position, RavenLocations[4])
        
          if (dist1 < 3 && !RAVEN_DEAD[0])
          {
            RAVEN_DEAD[0] = true
            engine.removeEntity(entity)
            engine.removeEntity(Ravens[0])
            scoreAmount += 200
            scoreVal.value = String(scoreAmount)
            crowSound.getComponent(AudioSource).playOnce()
          } else if (dist2 < 3 && !RAVEN_DEAD[1])
          {
            RAVEN_DEAD[1] = true
            engine.removeEntity(entity)
            engine.removeEntity(Ravens[1])
            scoreAmount += 200    
            scoreVal.value = String(scoreAmount)   
            crowSound.getComponent(AudioSource).playOnce()   
          } else if (dist3 < 3 && !RAVEN_DEAD[2])
          {
            RAVEN_DEAD[2] = true
            engine.removeEntity(entity)
            engine.removeEntity(Ravens[2])
            scoreAmount += 200      
            scoreVal.value = String(scoreAmount)   
            crowSound.getComponent(AudioSource).playOnce() 
          } else if (dist4 < 3 && !RAVEN_DEAD[3])
          {
            RAVEN_DEAD[3] = true
            engine.removeEntity(entity)
            engine.removeEntity(Ravens[3])
            scoreAmount += 200          
            scoreVal.value = String(scoreAmount)
            crowSound.getComponent(AudioSource).playOnce()
          } else if (dist5 < 3 && !RAVEN_DEAD[4])
          {
            RAVEN_DEAD[4] = true
            engine.removeEntity(entity)
            engine.removeEntity(Ravens[4])
            scoreAmount += 200      
            scoreVal.value = String(scoreAmount)   
            crowSound.getComponent(AudioSource).playOnce()
          }
        
        }




        // CHIMNEYS
        // check to see if any presents are shot to chimneys and if they match color
        if ( sleighPhase < 4 )
        {
          if (present.colorIndex == 0) // blue
          {
            var dist1 = distanceVector(transform.position, ChimneyLocations[2])
            var dist2 = distanceVector(transform.position, ChimneyLocations[5])
            var dist3 = distanceVector(transform.position, ChimneyLocations[8])
            if (dist1 < DISTANCE_TO_SCORE_THRESHOLD || dist2 < DISTANCE_TO_SCORE_THRESHOLD || dist3 < DISTANCE_TO_SCORE_THRESHOLD)
            {
              engine.removeEntity(entity)
              scoreAmount += 100
              scoreVal.value = String(scoreAmount)
              scoreSound.getComponent(AudioSource).playOnce()
            }
  
            if (dist1 < DISTANCE_TO_SCORE_THRESHOLD)
            {
              Chimneys[2].addComponent(new utils.ScaleTransformComponent(StartSize, EndSize, CHIMNEY_GROW_DURATION))
              Chimneys[2].addComponent(new utils.Delay(CHIMNEY_GROW_DURATION*1001, () => { Chimneys[2].addComponent(new utils.ScaleTransformComponent(EndSize, StartSize, CHIMNEY_GROW_DURATION)) }))
            } else if (dist2 < DISTANCE_TO_SCORE_THRESHOLD)
            {
              Chimneys[5].addComponent(new utils.ScaleTransformComponent(StartSize, EndSize, CHIMNEY_GROW_DURATION))
              Chimneys[5].addComponent(new utils.Delay(CHIMNEY_GROW_DURATION*1001, () => { Chimneys[5].addComponent(new utils.ScaleTransformComponent(EndSize, StartSize, CHIMNEY_GROW_DURATION)) }))
            } else if (dist3 < DISTANCE_TO_SCORE_THRESHOLD)
            {
              Chimneys[8].addComponent(new utils.ScaleTransformComponent(StartSize, EndSize, CHIMNEY_GROW_DURATION))
              Chimneys[8].addComponent(new utils.Delay(CHIMNEY_GROW_DURATION*1001, () => { Chimneys[8].addComponent(new utils.ScaleTransformComponent(EndSize, StartSize, CHIMNEY_GROW_DURATION)) }))
            }
  
          } else if (present.colorIndex == 1) // green
          {
            var dist1 = distanceVector(transform.position, ChimneyLocations[0])
            var dist2 = distanceVector(transform.position, ChimneyLocations[3])
            var dist3 = distanceVector(transform.position, ChimneyLocations[6])
            if (dist1 < DISTANCE_TO_SCORE_THRESHOLD || dist2 < DISTANCE_TO_SCORE_THRESHOLD || dist3 < DISTANCE_TO_SCORE_THRESHOLD)
            {
              engine.removeEntity(entity)
              scoreAmount += 100
              scoreVal.value = String(scoreAmount)
              scoreSound.getComponent(AudioSource).playOnce()
            }
  
            if (dist1 < DISTANCE_TO_SCORE_THRESHOLD)
            {
              Chimneys[0].addComponent(new utils.ScaleTransformComponent(StartSize, EndSize, CHIMNEY_GROW_DURATION))
              Chimneys[0].addComponent(new utils.Delay(CHIMNEY_GROW_DURATION*1001, () => { Chimneys[0].addComponent(new utils.ScaleTransformComponent(EndSize, StartSize, CHIMNEY_GROW_DURATION)) }))
            } else if (dist2 < DISTANCE_TO_SCORE_THRESHOLD)
            {
              Chimneys[3].addComponent(new utils.ScaleTransformComponent(StartSize, EndSize, CHIMNEY_GROW_DURATION))
              Chimneys[3].addComponent(new utils.Delay(CHIMNEY_GROW_DURATION*1001, () => { Chimneys[3].addComponent(new utils.ScaleTransformComponent(EndSize, StartSize, CHIMNEY_GROW_DURATION)) }))
            } else if (dist3 < DISTANCE_TO_SCORE_THRESHOLD)
            {
              Chimneys[6].addComponent(new utils.ScaleTransformComponent(StartSize, EndSize, CHIMNEY_GROW_DURATION))
              Chimneys[6].addComponent(new utils.Delay(CHIMNEY_GROW_DURATION*1001, () => { Chimneys[6].addComponent(new utils.ScaleTransformComponent(EndSize, StartSize, CHIMNEY_GROW_DURATION)) }))
            }
  
          } else if (present.colorIndex == 2) // red
          {
            var dist1 = distanceVector(transform.position, ChimneyLocations[1])
            var dist2 = distanceVector(transform.position, ChimneyLocations[4])
            var dist3 = distanceVector(transform.position, ChimneyLocations[7])
            if (dist1 < DISTANCE_TO_SCORE_THRESHOLD || dist2 < DISTANCE_TO_SCORE_THRESHOLD || dist3 < DISTANCE_TO_SCORE_THRESHOLD)
            {
              engine.removeEntity(entity)
              scoreAmount += 100
              scoreVal.value = String(scoreAmount)
              scoreSound.getComponent(AudioSource).playOnce()
            }
  
            if (dist1 < DISTANCE_TO_SCORE_THRESHOLD)
            {
              Chimneys[1].addComponent(new utils.ScaleTransformComponent(StartSize, EndSize, CHIMNEY_GROW_DURATION))
              Chimneys[1].addComponent(new utils.Delay(CHIMNEY_GROW_DURATION*1001, () => { Chimneys[1].addComponent(new utils.ScaleTransformComponent(EndSize, StartSize, CHIMNEY_GROW_DURATION)) }))
            } else if (dist2 < DISTANCE_TO_SCORE_THRESHOLD)
            {
              Chimneys[4].addComponent(new utils.ScaleTransformComponent(StartSize, EndSize, CHIMNEY_GROW_DURATION))
              Chimneys[4].addComponent(new utils.Delay(CHIMNEY_GROW_DURATION*1001, () => { Chimneys[4].addComponent(new utils.ScaleTransformComponent(EndSize, StartSize, CHIMNEY_GROW_DURATION)) }))
            } else if (dist3 < DISTANCE_TO_SCORE_THRESHOLD)
            {
              Chimneys[7].addComponent(new utils.ScaleTransformComponent(StartSize, EndSize, CHIMNEY_GROW_DURATION))
              Chimneys[7].addComponent(new utils.Delay(CHIMNEY_GROW_DURATION*1001, () => { Chimneys[7].addComponent(new utils.ScaleTransformComponent(EndSize, StartSize, CHIMNEY_GROW_DURATION)) }))
            }
  
          }
        }

        

      }

      

    }

  }
}

// Controls
const input = Input.instance

// Shoot Present
input.subscribe("BUTTON_DOWN", ActionButton.POINTER, false, (e) => {
  try   
  {  
    if (!presents[currentPresentCount].getComponent(Present).isFired) {

      shotPresent = true

      if (firstFire)
      {
        engine.addSystem(new presentShootSystem())
        firstFire = false
      }

      //shootSound.getComponent(AudioSource).playOnce()
      presents[currentPresentCount].getComponent(Present).isFired = true
      presents[currentPresentCount].setParent(null)

      let shootDirection = Vector3.Forward().rotate(Camera.instance.rotation) // Camera's forward vector
      presents[currentPresentCount].getComponent(Present).presentBody.position.set(
        Camera.instance.feetPosition.x + shootDirection.x,
        //Camera.instance.feetPosition.y + shootDirection.y,
        shootDirection.y + Camera.instance.position.y,
        Camera.instance.feetPosition.z + shootDirection.z
      )

      // Shoot
      const zeroVector: CANNON.Vec3 = new CANNON.Vec3(0,0,0)
      var factorVerticalTossBonus = SHOOT_VELOCITY * (1 + shootDirection.y) // Bonus toss power when aiming up

      presents[currentPresentCount].getComponent(Present).presentBody.velocity = zeroVector
      presents[currentPresentCount].getComponent(Present).presentBody.applyImpulse(
        new CANNON.Vec3(shootDirection.x * factorVerticalTossBonus, 20 + shootDirection.y * factorVerticalTossBonus * 1.5, shootDirection.z * factorVerticalTossBonus),
        new CANNON.Vec3(presents[currentPresentCount].getComponent(Present).presentBody.position.x, presents[currentPresentCount].getComponent(Present).presentBody.position.y, presents[currentPresentCount].getComponent(Present).presentBody.position.z)
      )

      // Add to count
      currentPresentCount += 1
    }  
  }
  catch (Error)   
  {  
    //log("[ERROR] You can't shoot a present yet. There is a cooldown between shooting presents.");  
  }  
})











