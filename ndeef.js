 $(document).ready(function () {
 	$(".TheWinner").css("display", "none");
 	var NamePlayer = getUserName().toUpperCase();
 	// console.log(NamePlayer);
 	var counter = 0;
 	var Rounds = 0;
 	var ComputerPasra = 0;
 	var ComputerScore = 0;
 	var PapCompCashed = 0;
 	var AllComputerScore = 0;
 	var playerBasra = 0;
 	var playerScore = 0;
 	var cardCashed = 0;
 	var AllPlayerScore = 0;
 	var AllCards = [];
 	var DeckCards = [];
 	var ComputerCards = [];
 	var PlayerCards = [];
 	var fileName = "cards/";
 	var extention = ".jpg";
 	var types = ["clubs", "diamonds", "hearts", "spades"];
 	var Pics_Card = ["king", "queen", "jack"];
    
    /**
     * @name: getUserName
     * @description: 
     * @params {string} st 
     * @return 
     */
 	function getUserName() {
 		var userName = localStorage.getItem("storageName");
 		return userName;
 	}

 	function AppendOn(childClass, name, val, parentClass) {
 		var El = $("<div>");
 		El.addClass(childClass).attr("value", val).css("background-image", "url(" + name + ")");
 		$(parentClass).append(El);
 	}

 	function DistributeOnDeck(thisVal) {
 		for (var i = 0; i < 4; i++) {
 			var RandomCard_Deck = Math.floor(Math.random() * AllCards.length);
 			while (AllCards[RandomCard_Deck].value == "jack") {
 				var RandomCard_Deck = Math.floor(Math.random() * AllCards.length);
 			}
 			if (AllCards[RandomCard_Deck].value != "jack") {
 				var DecObj = {
 					name: AllCards[RandomCard_Deck].name,
 					value: AllCards[RandomCard_Deck].value
 				}
 				DeckCards.push(DecObj);
 				AllCards = AllCards.filter(el => el.name !== DecObj.name);
 				AppendOn("Card2", DecObj.name, DecObj.value, ".DeckCards");
 				$(thisVal).css("display", "none");
 			}
 		}
 	}

 	function DistributeToPlayers() {
 		for (var i = 0; i < 4; i++) {
 			var RandomCard_Players = Math.floor(Math.random() * AllCards.length);
 			var PlayerObj = {
 				name: AllCards[RandomCard_Players].name,
 				value: AllCards[RandomCard_Players].value
 			}
 			PlayerCards.push(PlayerObj);
 			AllCards = AllCards.filter(el => el.name !== PlayerObj.name);
 			AppendOn("Card3", PlayerObj.name, PlayerObj.value, ".HudaCards");
 			counter++;
 		}
 		for (var i = 0; i < 4; i++) {
 			var RandomCard_computer = Math.floor(Math.random() * AllCards.length);
 			var CompObj = {
 				name: AllCards[RandomCard_computer].name,
 				value: AllCards[RandomCard_computer].value
 			}
 			ComputerCards.push(CompObj);
 			AllCards = AllCards.filter(el => el.name !== CompObj.name);
 			AppendOn("Card1", CompObj.name, CompObj.value, ".PlayerCards");
 			$(".Card1").css("background-image", 'url("img/back3.jpg")');
 			counter++;
 		}
 	}

 	function CheckForFlag_GetScore(WhichPlayer, lengthBefor, lengthArrAfter, CardName, thisCard) {
        // check 
        if (WhichPlayer == "true") {
 			PlayerCards = PlayerCards.filter(el => el.name !== CardName);
 			$(thisCard).remove();
 			cardCashed++;
 			playerScore += lengthBefor - lengthArrAfter;
 			AllPlayerScore = playerScore + cardCashed;
 		} else {
 			ComputerCards = ComputerCards.filter(el => el.name !== CardName);
 			$(".Card1").eq(thisCard).remove();
 			PapCompCashed++;
 			ComputerScore += lengthBefor - lengthArrAfter;
 			AllComputerScore = ComputerScore + PapCompCashed;
 		}
 		return [AllPlayerScore, AllComputerScore];
 	}

 	function CheckForFlag_GetBasra(WhichPlayer) {
 		if (WhichPlayer == "true") {
 			playerBasra += 1;
 			$(".Player2WinCards p:nth-child(3) span").html(playerBasra).css("color", "#00ff57");
 			$(".HudaCards audio").attr("src", "src/kisses.mp3");
 		} else {
 			ComputerPasra += 1;
 			$(".PlayerWinCards p:nth-child(3) span").html(ComputerPasra).css("color", "#00ff57");
 			$(".PlayerCards audio").attr("src", "src/hmm.mp3");
 		}
 	}

 	function Calc_CardsOnDeck(DeckArray, ValOfMyCard) {
 		ValOfMyCard = parseInt(ValOfMyCard);
 		DeckArray.sort(function (a, b) {
 			return (a.value > b.value) ? 1 : ((b.value > a.value) ? -1 : 0);
 		});
 		var BigArrCombination = [];
 		for (var i = 0; i < DeckArray.length; i++) {
 			var number1 = parseInt(DeckArray[i].value);
 			for (var j = i + 1; j < DeckArray.length; j++) {
 				var number2 = parseInt(DeckArray[j].value);
 				var sum = number1 + number2;
 				if (sum == ValOfMyCard) {
 					var arrSm = [number1, number2];
 					BigArrCombination.push(arrSm);
 				}
 				var smallArr = [number1, number2];
 				var copyTemp = j + 1;
 				for (var x = copyTemp; x < DeckArray.length; x++) {
 					if (sum + parseInt(DeckArray[x].value) <= ValOfMyCard) {
 						sum = sum + parseInt(DeckArray[x].value);
 						smallArr.push(parseInt(DeckArray[x].value));
 					}
 				}
 				if (sum != ValOfMyCard) {
 					smallArr = [number1, number2];
 					sum = number1 + number2;
 				} else {
 					BigArrCombination.push(smallArr);
 					copyTemp++;
 				}
 			}
 		}
 		BigArrCombination = BigArrCombination.map(JSON.stringify).reverse().filter(function (e, i, a) {
 			return a.indexOf(e, i + 1) === -1;
 		}).reverse().map(JSON.parse);
 		return BigArrCombination;
 	}

 	function GetRandomCard_fromTotalSumetion(AfterSetArr) {
 		var IndexOfRandom = Math.floor(Math.random() * AfterSetArr.length);
 		var ArrayChossed = AfterSetArr[IndexOfRandom];
 		for (var i = 0; i < ArrayChossed.length; i++) {
 			var Position = DeckCards.findIndex(el => el.value == ArrayChossed[i]);
 			var nameRemoveCard = DeckCards[Position].name;
 			DeckCards.splice(Position, 1);
 			$(".Card2[style*='" + nameRemoveCard + "']").remove();
 		}
 		return DeckCards;
 	}

 	function PlayGame(CardVal, CardName, lengthBefor, thisCard, flag) {
 		if (DeckCards.length == 0) {
 			var DecObj = {
 				name: CardName,
 				value: CardVal
 			}
 			DeckCards.push(DecObj);
 			AppendOn("Card2", DecObj.name, DecObj.value, ".DeckCards");
 			if (flag == "true") {
 				PlayerCards = PlayerCards.filter(el => el.name !== CardName);
 				$(thisCard).remove();
 				if (CardVal == "jack") {
 					$(".HudaCards audio").attr("src", "src/shit.mp3");
 				}
 			} else {
 				ComputerCards = ComputerCards.filter(el => el.name !== CardName);
 				$(".Card1").eq(thisCard).remove();
 			}
 		} else if (DeckCards.length == 1) {
 			if (CardVal == DeckCards[0].value || CardName == "cards/7_of_diamonds.jpg") {
 				DeckCards = [];
 				$(".Card2").remove();
 				var lengthArrAfter = DeckCards.length;
 				var ScoreArr = CheckForFlag_GetScore(flag, lengthBefor, lengthArrAfter, CardName, thisCard);
 				CheckForFlag_GetBasra(flag);
 			} else if (CardVal == "jack") {
 				$(".Card2").remove();
 				DeckCards = [];
 				var lengthArrAfter = DeckCards.length;
 				var ScoreArr = CheckForFlag_GetScore(flag, lengthBefor, lengthArrAfter, CardName, thisCard);
 			} else {
 				var DecObj = {
 					name: CardName,
 					value: CardVal
 				}
 				DeckCards.push(DecObj);
 				AppendOn("Card2", DecObj.name, DecObj.value, ".DeckCards");
 				if (flag == "true") {
 					$(thisCard).remove();
 					PlayerCards = PlayerCards.filter(el => el.name !== CardName);
 				} else {
 					ComputerCards = ComputerCards.filter(el => el.name !== CardName);
 					$(".Card1").eq(thisCard).remove();
 				}
 			}
 		} else if (DeckCards.length > 1) {
 			var Sum = 0;
 			for (var i = 0; i < DeckCards.length; i++) {
 				Sum += parseInt(DeckCards[i].value);
 			}
 			if ((CardVal == Sum) || ((CardName == "cards/7_of_diamonds.jpg") && (Sum <= 10))) {
 				$(".PlayerCards audio").attr("src", "src/chipsHandle5.mp3");
 				DeckCards = [];
 				$(".Card2").remove();
 				CheckForFlag_GetBasra(flag);
 				var lengthArrAfter = 0;
 				var ScoreArr = CheckForFlag_GetScore(flag, lengthBefor, lengthArrAfter, CardName, thisCard);
 			} else if (CardVal == "jack" || CardName == "cards/7_of_diamonds.jpg") {
 				$(".PlayerCards audio").attr("src", "src/chipsHandle5.mp3");
 				$(".Card2").remove();
 				DeckCards = [];
 				var lengthArrAfter = DeckCards.length;
 				var ScoreArr = CheckForFlag_GetScore(flag, lengthBefor, lengthArrAfter, CardName, thisCard);
 			} else {
 				var IsEqual = false;
 				var EnterInEqual = false;
 				for (var i = 0; i < DeckCards.length; i++) {
 					if (CardVal == DeckCards[i].value) {
 						IsEqual = true;
 						EnterInEqual = true;
 						DeckCards = DeckCards.filter(el => el.value !== DeckCards[i].value);
 						$(".Card2[value= '" + CardVal + "']").remove();
 						var lengthArrAfter = DeckCards.length;
 						var ScoreArr = CheckForFlag_GetScore(flag, lengthBefor, lengthArrAfter, CardName, thisCard);
 					}
 				}
 				var ArrOfPics = [];
 				for (var i = 0; i < DeckCards.length; i++) {
 					if (DeckCards[i].value == "jack" || DeckCards[i].value == "queen" || DeckCards[i].value == "king") {
 						ArrOfPics.push(DeckCards[i]);
 						DeckCards = DeckCards.filter(el => el.name != DeckCards[i].name);
 						i--;
 					}
 				}
 				var lengthDeckBeforeSumition = DeckCards.length;
 				for (var i = 0; i < DeckCards.length; i++) {
 					var AfterSetArr = Calc_CardsOnDeck(DeckCards, CardVal);
 					if (AfterSetArr.length != 0) {
 						IsEqual = true;
 						DeckCards = GetRandomCard_fromTotalSumetion(AfterSetArr);
 						var lengthDeckAfterSumition = DeckCards.length;
 						if (EnterInEqual == true) {
 							((flag == "true") ? cardCashed-- : PapCompCashed--);
 						}
 						var ScoreArr = CheckForFlag_GetScore(flag, lengthDeckBeforeSumition, lengthDeckAfterSumition, CardName, thisCard);
 					} else {
 						if (ArrOfPics.length != 0) {
 							for (var i = 0; i < ArrOfPics.length; i++) {
 								DeckCards.push(ArrOfPics[i]);
 							}
 							ArrOfPics = [];
 						}
 						if (DeckCards.length == 0) {
 							// Basra
 							CheckForFlag_GetBasra(flag);
 						}
 						break;
 					}
 					if (ArrOfPics.length != 0) {
 						for (var i = 0; i < ArrOfPics.length; i++) {
 							DeckCards.push(ArrOfPics[i]);
 						}
 					}
                    
                    if(DeckCards.length == 0){
                                CheckForFlag_GetBasra(flag);  
                            }
 				}
 			}
 			if (IsEqual == false) {
 				var DecObj = {
 					name: CardName,
 					value: CardVal
 				}
 				console.log(DecObj);
 				DeckCards.push(DecObj);
 				AppendOn("Card2", DecObj.name, DecObj.value, ".DeckCards");
 				if (flag == "true") {
 					$(thisCard).remove();
 					PlayerCards = PlayerCards.filter(el => el.name !== CardName);
 				} else {
 					ComputerCards = ComputerCards.filter(el => el.name !== CardName);
 					$(".Card1").eq(thisCard).remove();;
 				}
 			}
 		}
 		return ScoreArr;
 	}

 	function WhoWin() {
 		$(".Card2").remove();
 		var TotalScoreToPlayer = (playerBasra * 10) + (AllPlayerScore - playerBasra);
 		var TotalScoreToComputer = (ComputerPasra * 10) + (AllComputerScore - ComputerPasra);
 		$(".TheWinner").css("display", "flex");
 		if (TotalScoreToPlayer > TotalScoreToComputer) {
 			$(".classFlex audio").attr("src", "src/Winning-sound-effect.mp3");
 			$(".TheWinner h2").html("Congratulations ..");
 			$(".TheWinner h3").html("You Are The Winner " + NamePlayer + "^_^");
 			$(".TheWinner p ").html("TotalScore You Have IS : " + TotalScoreToPlayer);
 		} else {
 			$(".classFlex audio").attr("src", "src/aauuu.mp3");
 			$(".TheWinner h2").html("Game Over >_<" + NamePlayer);
 			$(".TheWinner h3").html(" You Can Try Again IF You Wish");
 			$(".TheWinner p ").html("TotalScore OF Computer IS : " + TotalScoreToComputer);
 		}
 	}
     
      function faceW4(CardValComputer,ComputerCardName)
    {
        
         $(".Card1").eq(CardValComputer).css("background-image", "url("+ ComputerCardName +")");
    }
     
     
 	for (var i = 1; i < 11; i++) {
 		for (var j = 0; j < types.length; j++) {
 			var obj = {
 				name: fileName + i + "_of_" + types[j] + extention,
 				value: i
 			}
 			AllCards.push(obj);
 		}
 	}
 	for (var k = 0; k < Pics_Card.length; k++) {
 		for (var j = 0; j < types.length; j++) {
 			var obj = {
 				name: fileName + Pics_Card[k] + "_of_" + types[j] + extention,
 				value: Pics_Card[k]
 			}
 			AllCards.push(obj);
 		}
 	}
 	console.log(AllCards);
 	$("#StartGame").on("click", function () {
        
         $("#PlayAgain").css("display","inline");
 		$("#PlayersCards").css("display", "inline");
 		DistributeOnDeck(this);
 	});
 	$("#PlayersCards").on("click", function () {
 		$(".PlayerWinCards , .Player2WinCards").css("color", "#ffee19");
 		$(".PlayerWinCards p:first-child span").html("Computer").css("color", "#005096");
 		if (PlayerCards.length == 0 && ComputerCards.length == 0) {
 			$("audio").attr("src", "src/zapsplat_leisure_card_game_in_box_shake.mp3");
 			$(".Card1").remove();
 			$(".Card3").remove();
 			Rounds++;
 			$(".RoundNum p:first-child span").html(Rounds);
 			$(".RoundNum p:nth-child(2) span").html(NamePlayer)
 			$(".Player2WinCards p:first-child span").html(NamePlayer).css("color", "#005096");
 			DistributeToPlayers();
 			if (counter == 48) {
 				$(this).attr("src", "img/joker2.jpg");
 			}
 			$(".Card3").on("click", function (e) {
 				$(".HudaCards audio").attr("src", "src/cardPlace2.mp3");
 				$(".RoundNum p:nth-child(2) span").html("Computer");
 				$(".PlayerWinCards").css("background", "#f0a7c2ab").css("transition", "2s");
 				$(".Player2WinCards").css("background", "#4e8b8cab").css("transition", "2s");
 				var valOfThisCard = $(this).attr("value");
 				var Urlimg = $(this).css('background-image');
 				var cleanup = /\"|\'|\)/g;
 				var ThisCard = Urlimg.split('/').pop().replace(cleanup, '');
 				var NameOfThisCard = fileName + ThisCard;
 				var lengthArrBefor = DeckCards.length;
 				if (PlayerCards.length == ComputerCards.length) {
 					var AllScoreArr = PlayGame(valOfThisCard, NameOfThisCard, lengthArrBefor, this, "true");
 					if (typeof (AllScoreArr) !== "undefined") {
 						var TotalScorePlayer = AllScoreArr[0];
 						$(".Player2WinCards p:nth-child(2) span").html(TotalScorePlayer);
 					}
                    
 					setTimeout(function () {
 						var CardValComputer = Math.floor(Math.random() * ComputerCards.length);
 						var ComputerCardVal = ComputerCards[CardValComputer].value;
 						var ComputerCardName = ComputerCards[CardValComputer].name;
                        faceW4(CardValComputer,ComputerCardName);
                        
                        setTimeout(function(){
                            var lengthArrBefor = DeckCards.length; // lenght before 
 						$(".PlayerCards audio").attr("src", "src/cardSlide8.mp3");
 						var AllScoreArr2 = PlayGame(ComputerCardVal, ComputerCardName, lengthArrBefor, CardValComputer, "false");
 						$(".Card1").animate({
 							opacity: '0.6'
 						});
 						if (typeof (AllScoreArr2) !== "undefined") {
 							var TotalScoreComputer = AllScoreArr2[1];
 							$(".PlayerWinCards p:nth-child(2) span").html(TotalScoreComputer);
 						}
 						if (Rounds == 6 && PlayerCards.length == 0 && ComputerCards.length == 0) {
 							WhoWin();
 						}
 						$(".RoundNum p:nth-child(2) span").html(NamePlayer);
 						$(".Player2WinCards").css("background", "#f0a7c2ab").css("transition", "2s").css("color", "#ff004c");
 						$(".PlayerWinCards").css("background", "#4e8b8cab").css("transition", "2s");
                            
                        },1000);
 						
 					}, 1500);
 					$(".Card1").animate({
 						opacity: '1'
 					});
 				}
 			});
 		}
 	});
 });