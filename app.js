// On référence le parent le plus élevé qui sera le main qui  va contenir le jeu
const gameContainer = document.getElementById("game-container")

// On déclare les variable qui devront être accessible globalement
let gameBoard
let score = 0
let scoreText

// On génere le header du jeu qui ainsi que son contenu le titre , le score et on le lie au main
const generateHeader = () => {
  const gameInfo = document.createElement("header")
  gameInfo.classList.add(
    "w-1/2",
    "flex",
    "justify-between",
    "items-center",
    "border-[3px]",
    "border-slate-500",
    "rounded-2xl",
    "p-6"
  )

  const gameInfoTitle = document.createElement("img")
  gameInfoTitle.setAttribute("src", "./assets/logo.svg")
  gameInfo.appendChild(gameInfoTitle)
  gameContainer.appendChild(gameInfo)

  // Dans le header on génére la partie score
  const gameScoreContainer = document.createElement("div")
  gameScoreContainer.classList.add(
    "w-36",
    "h-28",
    "flex",
    "flex-col",
    "items-center",
    "bg-white",
    "py-2",
    "rounded-lg"
  )
  gameInfo.appendChild(gameScoreContainer)

  const scoreTitle = document.createElement("h3")
  scoreTitle.innerText = "SCORE"
  scoreTitle.classList.add("text-blue-900", "text-lg")

  scoreText = document.createElement("h2")
  scoreText.innerText = score
  scoreText.classList.add("font-bold", "text-slate-700", "text-6xl")
  gameScoreContainer.appendChild(scoreTitle)
  gameScoreContainer.appendChild(scoreText)
}

// On créer une fonction qui va contenir le jeu complet à son état initial
const generateGame = () => {
  // On génere le  plateau de jeu qui va contenir le jeu entier
  gameBoard = document.createElement("section")
  gameBoard.classList.add("relative", "flex", "justify-center", "gap-24")
  gameContainer.appendChild(gameBoard)

  // On génére le triangle du début de jeu
  const triangle = document.createElement("img")
  triangle.setAttribute("src", "./assets/bg-triangle.svg")
  gameBoard.appendChild(triangle)

  // On créer un tableau qui va nous permmettre de différencier chaque inputs
  const inputTypes = ["rock", "paper", "scissors"]

  // On créer un objet qui sera lié au valeur tu tableau inputTypes et qui posèdera les propriétées rélative à chaque input
  const inputLocations = {
    rock: ["135", "65", "rose-500"],
    paper: ["-95", "-65", "blue-600"],
    scissors: ["-95", "205", "amber-400"],
  }

  // On boucle dans le tableau inputTypes pour récupérer chacunes des valeurs
  inputTypes.forEach(type => {
    // Pour chaque valeur on génére un input button
    const input = document.createElement("button")

    // On lui ajoute des classes certaines seront relative à chaque input selon l'objet
    input.classList.add(
      "absolute",
      `top-[${inputLocations[type][0]}px]`,
      `left-[${inputLocations[type][1]}px]`,
      "size-48",
      "bg-white",
      "flex",
      "justify-center",
      "items-center",
      "border-[22px]",
      `border-${inputLocations[type][2]}`,
      "rounded-full",
      `${type}-shadow`,
      "hover:scale-110",
      "transition-transform",
      "input",
      type
    )

    // On génére le symbol qui sera dans le bouton et on le fera changer en fonction de chaque input
    const symbol = document.createElement("img")
    symbol.setAttribute("src", `./assets/icon-${type}.svg`)
    input.appendChild(symbol)
    gameBoard.appendChild(input)
  })

  // On créer une fonction qui va générer le duel entre le joueur et la machine

  const generateDuel = input => {
    // On génére la partie input choisit coté joueur
    const playerChoice = document.createElement("div")
    playerChoice.classList.add(
      "flex",
      "flex-col",
      "items-center",
      "gap-12",
      "text-2xl"
    )
    const playerChoiceTitle = document.createElement("h3")
    playerChoiceTitle.innerText = "YOU PICKED"
    playerChoice.appendChild(playerChoiceTitle)

    // On génére la partie résultat maintenant qui sera caché entre les 2 inputs joueur et machine
    const resultContainer = document.createElement("div")
    resultContainer.classList.add(
      "flex",
      "flex-col",
      "gap-5",
      "self-center",
      "hidden"
    )

    const resultTitle = document.createElement("h2")
    resultTitle.classList.add("text-6xl")
    resultContainer.appendChild(resultTitle)

    const resultBtn = document.createElement("button")
    resultBtn.innerText = "PLAY AGAIN"
    resultBtn.classList.add(
      "text-lg",
      "bg-white",
      "text-slate-700",
      "py-2",
      "px-9",
      "rounded-md",
      "hover:text-red-500",
      "transition-colors"
    )
    resultContainer.appendChild(resultBtn)

    newGame(resultBtn, input)

    // On génére la partie input choisit coté machine
    const robotChoice = document.createElement("div")
    robotChoice.classList.add(
      "flex",
      "flex-col",
      "items-center",
      "gap-12",
      "text-2xl"
    )

    const robotChoiceTitle = document.createElement("h3")
    robotChoiceTitle.innerText = "THE HOUSE PICKED"
    robotChoice.appendChild(robotChoiceTitle)

    const robotInput = document.createElement("button")
    robotInput.classList.add(
      "size-72",
      "bg-white",
      "flex",
      "justify-center",
      "items-center",
      "border-[22px]",
      "border-white",
      "rounded-full",
      "default-shadow",
      "input"
    )

    robotChoice.appendChild(robotInput)

    // A l'intérieur de l'input machine on va générer le compte à rebours avant d'afficher l'input machine
    const RobotCounterText = document.createElement("h3")
    RobotCounterText.classList.add("font-bold", "text-slate-700", "text-7xl")
    robotInput.appendChild(RobotCounterText)

    gameContainer.classList.remove("gap-40")
    gameContainer.classList.add("gap-16")
    gameBoard.appendChild(playerChoice)
    gameBoard.appendChild(resultContainer)
    gameBoard.appendChild(robotChoice)
    playerChoice.appendChild(input)

    // On créer une fonction qui va générer aléatoirement l'input machine après le compte à rebours
    const generateRobotInput = () => {
      let seconds = 3
      let randomNumber = Math.floor(Math.random() * 3)
      const robotSymbol = document.createElement("img")
      robotInput.appendChild(robotSymbol)

      const interval = setInterval(() => {
        RobotCounterText.innerText = seconds
        seconds--

        if (seconds == 0) {
          clearInterval(interval)

          setTimeout(() => {
            RobotCounterText.remove()
            robotInput.firstChild.classList.add("w-20")
            if (randomNumber == 0) {
              robotInput.setAttribute("data-type", randomNumber)
              robotInput.classList.add(
                `border-${inputLocations.rock[2]}`,
                `${inputTypes[0]}-shadow`
              )
              robotSymbol.setAttribute("src", `./assets/icon-rock.svg`)
            } else if (randomNumber == 1) {
              robotInput.setAttribute("data-type", randomNumber)
              robotInput.classList.add(
                `border-${inputLocations.paper[2]}`,
                `${inputTypes[1]}-shadow`
              )
              robotSymbol.setAttribute("src", `./assets/icon-paper.svg`)
            } else if (randomNumber == 2) {
              robotInput.setAttribute("data-type", randomNumber)
              robotInput.classList.add(
                `border-${inputLocations.scissors[2]}`,
                `${inputTypes[2]}-shadow`
              )
              robotSymbol.setAttribute("src", `./assets/icon-scissors.svg`)
            }
          }, 800)
        }
      }, 500)
    }

    generateRobotInput()

    setTimeout(() => {
      if (input.dataset.type == robotInput.dataset.type) {
        resultTitle.innerText = "EQUALITY"
        resultContainer.classList.remove("hidden")
      } else if (input.dataset.type == 0 && robotInput.dataset.type == 1) {
        if (score > 0) {
          score--
          scoreText.innerText = score
        }
        resultTitle.innerText = "YOU LOSE"
        resultContainer.classList.remove("hidden")
      } else if (input.dataset.type == 0 && robotInput.dataset.type == 2) {
        score++
        scoreText.innerText = score
        resultTitle.innerText = "YOU WIN"
        resultContainer.classList.remove("hidden")
      } else if (input.dataset.type == 1 && robotInput.dataset.type == 0) {
        score++
        scoreText.innerText = score
        resultTitle.innerText = "YOU WIN"
        resultContainer.classList.remove("hidden")
      } else if (input.dataset.type == 1 && robotInput.dataset.type == 2) {
        if (score > 0) {
          score--
          scoreText.innerText = score
        }
        resultTitle.innerText = "YOU LOSE"
        resultContainer.classList.remove("hidden")
      } else if (input.dataset.type == 2 && robotInput.dataset.type == 0) {
        if (score > 0) {
          score--
          scoreText.innerText = score
        }
        resultTitle.innerText = "YOU LOSE"
        resultContainer.classList.remove("hidden")
      } else if (input.dataset.type == 2 && robotInput.dataset.type == 1) {
        score++
        scoreText.innerText = score
        resultTitle.innerText = "YOU WIN"
        resultContainer.classList.remove("hidden")
      }
    }, 2500)
  }

  // On déclare une constante qui va selectionner les 3 inputs de départ
  const allInputs = document.querySelectorAll(".input")

  // On boucle dans la constante qui contient les 3 inputs distinct
  for (const input of allInputs) {
    // On déclare chaque type d'input que le joueur devra choisir
    const rock = document.querySelector(".rock")
    const paper = document.querySelector(".paper")
    const scissors = document.querySelector(".scissors")

    // On écoute chaque input pour savoir si on à cliquer desus
    input.addEventListener("click", () => {
      // On supprime le triangle
      triangle.remove()
      // On supprime les class de hover
      input.classList.remove("hover:scale-110", "transition-transform")

      // On défini des conditions pour afficher uniquement l'input sur lequel on cliqué et supprimer les 2 autres
      if (input == rock) {
        rock.setAttribute("data-type", 0)
        rock.classList.remove("absolute")
        rock.classList.add("size-72")
        rock.firstChild.classList.add("w-20")
        paper.remove()
        scissors.remove()
      } else if (input == paper) {
        paper.setAttribute("data-type", 1)
        paper.classList.remove("absolute")
        paper.classList.add("size-72")
        paper.firstChild.classList.add("w-20")
        rock.remove()
        scissors.remove()
      } else if (input == scissors) {
        scissors.setAttribute("data-type", 2)
        scissors.classList.remove("absolute")
        scissors.classList.add("size-72")
        scissors.firstChild.classList.add("w-20")
        rock.remove()
        paper.remove()
      }

      // On génére le duel
      generateDuel(input)
      // On désactive le click sur notre input
      input.disabled = true
    })
  }
}

// Partie pour afficher les règles du jeu
const generateRules = () => {

  if (!document.querySelector(".rules-button")) {

    const gameRules = document.createElement("footer")
    gameRules.classList.add("flex", "justify-end", "px-10")
    const rules = document.createElement("button")
    rules.innerText = "RULES"
    rules.classList.add(
      "rules-button",
      "text-lg",
      "tracking-widest",
      "border-2",
      "border-slate-500",
      "rounded-lg",
      "py-2",
      "px-10",
      "hover:bg-white",
      "hover:text-slate-700",
      "transition-colors"
    )
    gameRules.appendChild(rules)
    document.body.appendChild(gameRules)

    const overlay = document.createElement("div")
    overlay.classList.add(
      "absolute",
      "top-0",
      "right-0",
      "left-0",
      "bottom-0",
      "bg-black",
      "opacity-40",
      "z-40",
      "hidden"
    )
    document.body.appendChild(overlay)

    const popupRules = document.createElement("dialog")
    popupRules.classList.add(
      "absolute",
      "top-1/3",
      "size-[400px]",
      "bg-white",
      "rounded-md",
      "p-8",
      "z-50"
    )
    document.body.appendChild(popupRules)

    const popupRulesTitleContainer = document.createElement("div")
    popupRulesTitleContainer.classList.add("flex", "justify-between", "mb-12")
    popupRules.appendChild(popupRulesTitleContainer)

    const popupRulesTitle = document.createElement("h3")
    popupRulesTitle.classList.add("font-bold", "text-3xl", "text-slate-700")
    popupRulesTitle.innerText = "RULES"
    popupRulesTitleContainer.appendChild(popupRulesTitle)

    const closeButton = document.createElement("button")
    const closImage = document.createElement("img")
    closImage.setAttribute("src", "./assets/icon-close.svg")
    closeButton.appendChild(closImage)
    popupRulesTitleContainer.appendChild(closeButton)

    const rulesSchemeContainer = document.createElement("figure")
    rulesSchemeContainer.classList.add("flex", "justify-center")

    const rulesScheme = document.createElement("img")
    rulesScheme.setAttribute("src", "./assets/image-rules.svg")
    rulesSchemeContainer.appendChild(rulesScheme)

    popupRules.appendChild(rulesSchemeContainer)

    // On va écouter les click sur le bouton Rules
    rules.addEventListener("click", () => {
      // Si un click est détecté alors on supprime la classe hidden de l'overlay
      overlay.classList.remove("hidden")
      // Et on ajoute l'attribut open à notre modal
      popupRules.setAttribute("open", "")
    })

    // On va écouter les click sur le bouton fermeture X du modal
    // Si un click est détecté on appel alors la fonction removeModal
    closeButton.addEventListener("click", removeModal)
    // Aussi sur l'overlay
    overlay.addEventListener("click", removeModal)

    // On créer une fonction removeModal
    function removeModal() {
      // On ajoute la classe hidden à l'overlay
      overlay.classList.add("hidden")
      // On supprime l'attribut de open à notre modal
      popupRules.removeAttribute("open", "")
    }
  }
}

// On créer une fonction pour lancer le jeu
const startGame = () => {
  const gameLogo = document.createElement("img")
  gameLogo.setAttribute("src", "./assets/logo.svg")
  gameLogo.classList.add("w-60")
  gameContainer.appendChild(gameLogo)
  gameContainer.classList.add("h-screen")

  const startButton = document.createElement("button")
  startButton.classList.add(
    "text-3xl",
    "tracking-widest",
    "border-2",
    "border-slate-500",
    "rounded-lg",
    "py-2",
    "px-10",
    "hover:bg-white",
    "hover:text-slate-700",
    "transition-colors"
  )

  startButton.innerText = "START"
  gameContainer.appendChild(startButton)
  startButton.addEventListener("click", () => {
    gameContainer.classList.remove("h-screen")
    gameLogo.remove()
    startButton.remove()

    generateRules()
    generateGame()
  })
}

// Au démarrage on lance la fonction pour générer le header et la fonction pour lancer le jeu
generateHeader()
startGame()

// On créer une fonction pour reset la partie à chaque tour
const newGame = (button, input) => {
  button.addEventListener("click", () => {
    input.disabled = false

    // Effacer le contenu du conteneur du jeu
    gameContainer.removeChild(gameBoard)
    gameBoard.innerHTML = ""

    gameContainer.classList.remove("gap-16")
    gameContainer.classList.add("gap-40")

    // Générer à nouveau le jeu
    generateGame()
  })
}
