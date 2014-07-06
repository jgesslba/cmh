// Translation object
var translations = {
	
	// @region UNICODE-ZEICHENWERT VON UMLAUTEN UND SONDERZEICHEN TEMPLATE
	
	// Umlaut A gross = \u00c4
	// Umlaut a klein = \u00e4
	// Umlaut O gross = \u00d6
	// Umlaut o klein = \u00f6
	// Umlaut U gross = \u00dc
	// Umlaut u klein = \u00fc
	// Scharfes s klein = \u00df
	// Eurozeichen = \u20AC
  	// Dollarzeichen = \u0024
	// Prozentzeichen = \u0025
	
	// @endregion
	
	// @region INDEX
	
	// page index
	"index" : {

		"de" : {
			"richTextUserName" : "Benutzername",
			"richTextPassword" : "Passwort",
			"richTextSignUp" : "Registrieren",
			"richTextLostUserCredentials" : "Anmeldedaten vergessen?",
			"richTextIntro" : "Spiel das Spiel!",
			"richTextHeadlineGameDescription" : "Spielbeschreibung",
			"richTextGameDescription" : "Das Krankenhausplanspiel COREMAIN Hospital bietet die M\u00f6glichkeit zur Simulation von 1) unterschiedlichen Rahmenbedingungen, 2) einer Konkurrenzsituation im regionalen Gesundheitsmarkt und 3) drei unterschiedlichen Patientenverg\u00fctungssystemen, basierend auf der Internettechnologie und ihren Vorteilen der Zeit- und Ortsunabh\u00e4ngigkeit. In unserem Spiel werden bis zu 6 Krankenh\u00e4user \u00fcber eine Dauer von 12 Perioden simuliert, die entsprechend der angewendeten Strategie in verschiedenen Auspr\u00e4gungen kooperieren und/oder konkurrieren k\u00f6nnen. In einem Krankenhaus m\u00fcssen finanzielle und organisatorische Entscheidungen innerhalb der Abteilungen getroffen werden. An vordefinierten Indikatoren wird schlie\u00dflich der Gewinner des Spiels ermittelt. Das Spiel wurde unter Anwendung von Methoden des Operations Research entwickelt und durch die Erhebung von Realdaten f\u00fcr Patientenpfade auf eine realistische Datenbasis gestellt. Coremain Hospital l\u00e4sst die Behandlung von Fragestellungen, wie in etwa die Auswirkungen von Entscheidungen unter verschiedenen Patientenverg\u00fctungssystemen zu, die bis dato durch andere Spiele nicht ber\u00fccksichtigt wurden. Dar\u00fcber hinaus wird der evolution\u00e4re Charakter des Spiels durch die Verwendung der Internettechnologie verst\u00e4rkt. Das Spiel kann sowohl in Ausbildung und Forschung als Instrument zur Bewertung von neuen Managementans\u00e4tzen, Ver\u00e4nderungsstrategien und betriebswirtschaftlichen Modellen als auch in der Praxis als Trainingssystem und damit zur Generierung von neuem Wissen verwendet werden [1].",
			"richTextHeadlineGameConcept" : "Spielkonzept",
			"richTextGameConcept" : "Mittels Diskreter-Event-Simulation wird die Behandlung von Patienten mit sowohl operativen und nicht-operativen Krankheitsbildern, beginnend mit der Nachfrage von Patienten um Behandlung in einem Krankenhaus \u00fcber die Aufnahme in oder die Abweisung von einem Krankenhaus, der Durchf\u00fchrung von verschiedenen Behandlungen entsprechend realistischer Behandlungspfade bis hin zur Entlassung aus dem Krankenhaus modelliert. Die bis zu sechs Krankenh\u00e4user einer Region konkurieren um Patienten und Budget in Abh\u00e4ngigkeit von ihrer Mission, der regionalen Gesundheitspolitik, dem Patientenverg\u00fctungssystem, der Arbeitsmarktsituation und den am Markt verf\u00fcgbaren R\u00f6ntgenger\u00e4ten. Jedes Krankenhaus besteht aus einem Management-, Pflege-, R\u00f6ntgen- und Operations-Bereich. Die Krankenh\u00e4user der Region k\u00f6nnen miteinander kooperieren, wobei die Spielenden eines Krankenhauses auch nicht die Konkurrenzsituation au\u00dfer Acht lassen sollten. Leistung und Effizienz eines Krankenhauses werden an Hand von vordefinierten Indikatoren (z.B. Versorgungsqualit\u00e4t, Patientenzufriedenheit, Personalzufriedenheit, Auslastungsgrad, durchschnittliche Verweildauer) gem\u00e4\u00df den von den Spielern selbst festzulegenden aber auch regionalen Zielvorgaben im Vergleich zu konkurrierenden H\u00e4usern nach jeder Spielperiode festgestellt. Sieger ist jenes Krankenhaus, welches \u00fcber die zw\u00f6lf Spielperioden die beste Gesamtleistung erbringt, d.h. welches sowohl die regional vorgegebenen als auch die selbst definierten Ziele bestm\u00f6glich erreicht [1].",
			"errorMessageRequired" : "Erforderlich!",
			"errorMessageLoginFailed" : "Anmeldung gescheitert!",
			"buttonLogin" : "Anmelden"
		},
		
		"en" : {
			"richTextUserName" : "Username",
			"richTextPassword" : "Password",
			"richTextSignUp" : "Sign up",
			"richTextLostUserCredentials" : "Lost credentials?",
			"richTextIntro" : "Play the game!",
			"richTextHeadlineGameDescription" : "Game description",
			"richTextGameDescription" : "Das Krankenhausplanspiel COREMAIN Hospital bietet die M\u00f6glichkeit zur Simulation von 1) unterschiedlichen Rahmenbedingungen, 2) einer Konkurrenzsituation im regionalen Gesundheitsmarkt und 3) drei unterschiedlichen Patientenverg\u00fctungssystemen, basierend auf der Internettechnologie und ihren Vorteilen der Zeit- und Ortsunabh\u00e4ngigkeit. In unserem Spiel werden bis zu 6 Krankenh\u00e4user \u00fcber eine Dauer von 12 Perioden simuliert, die entsprechend der angewendeten Strategie in verschiedenen Auspr\u00e4gungen kooperieren und/oder konkurrieren k\u00f6nnen. In einem Krankenhaus m\u00fcssen finanzielle und organisatorische Entscheidungen innerhalb der Abteilungen getroffen werden. An vordefinierten Indikatoren wird schlie\u00dflich der Gewinner des Spiels ermittelt. Das Spiel wurde unter Anwendung von Methoden des Operations Research entwickelt und durch die Erhebung von Realdaten f\u00fcr Patientenpfade auf eine realistische Datenbasis gestellt. Coremain Hospital l\u00e4sst die Behandlung von Fragestellungen, wie in etwa die Auswirkungen von Entscheidungen unter verschiedenen Patientenverg\u00fctungssystemen zu, die bis dato durch andere Spiele nicht ber\u00fccksichtigt wurden. Dar\u00fcber hinaus wird der evolution\u00e4re Charakter des Spiels durch die Verwendung der Internettechnologie verst\u00e4rkt. Das Spiel kann sowohl in Ausbildung und Forschung als Instrument zur Bewertung von neuen Managementans\u00e4tzen, Ver\u00e4nderungsstrategien und betriebswirtschaftlichen Modellen als auch in der Praxis als Trainingssystem und damit zur Generierung von neuem Wissen verwendet werden [1].",
			"richTextHeadlineGameConcept" : "Game concept",
			"richTextGameConcept" : "Mittels Diskreter-Event-Simulation wird die Behandlung von Patienten mit sowohl operativen und nicht-operativen Krankheitsbildern, beginnend mit der Nachfrage von Patienten um Behandlung in einem Krankenhaus \u00fcber die Aufnahme in oder die Abweisung von einem Krankenhaus, der Durchf\u00fchrung von verschiedenen Behandlungen entsprechend realistischer Behandlungspfade bis hin zur Entlassung aus dem Krankenhaus modelliert. Die bis zu sechs Krankenh\u00e4user einer Region konkurieren um Patienten und Budget in Abh\u00e4ngigkeit von ihrer Mission, der regionalen Gesundheitspolitik, dem Patientenverg\u00fctungssystem, der Arbeitsmarktsituation und den am Markt verf\u00fcgbaren R\u00f6ntgenger\u00e4ten. Jedes Krankenhaus besteht aus einem Management-, Pflege-, R\u00f6ntgen- und Operations-Bereich. Die Krankenh\u00e4user der Region k\u00f6nnen miteinander kooperieren, wobei die Spielenden eines Krankenhauses auch nicht die Konkurrenzsituation au\u00dfer Acht lassen sollten. Leistung und Effizienz eines Krankenhauses werden an Hand von vordefinierten Indikatoren (z.B. Versorgungsqualit\u00e4t, Patientenzufriedenheit, Personalzufriedenheit, Auslastungsgrad, durchschnittliche Verweildauer) gem\u00e4\u00df den von den Spielern selbst festzulegenden aber auch regionalen Zielvorgaben im Vergleich zu konkurrierenden H\u00e4usern nach jeder Spielperiode festgestellt. Sieger ist jenes Krankenhaus, welches \u00fcber die zw\u00f6lf Spielperioden die beste Gesamtleistung erbringt, d.h. welches sowohl die regional vorgegebenen als auch die selbst definierten Ziele bestm\u00f6glich erreicht [1].",
			"errorMessageRequired" : "Required!",
			"errorMessageLoginFailed" : "Login failed!",
			"buttonLogin" : "Sign in"
		}
	},
	
	// @endregion
		
	// @region APP
	
	// page app
	"app" : {

		"de" : {
			"richTextInformation" : "W\u00e4hlen Sie ein Spiel und klicken Sie anschlie\u00dfend auf \"Gew\u00e4hltes Spiel betreten\".",
			"richTextLogout" : "Abmelden",
			"menuGamer" : "Spieler",
			"menuManagement" : "Management",
			"menuNursing" : "Pflege",
			"menuRadiology" : "R\u00f6ntgen",
			"menuSurgery" : "OP",
			"menuGamehost" : "Spielleiter",
			"menuAdmin" : "Administrator"
		},
		
		"en" : {
			"richTextInformation" : "Select a game and click on \"Enter selected game\".",
			"richTextLogout" : "Logout",
			"menuGamer" : "Gamer",
			"menuManagement" : "Management",
			"menuNursing" : "Care",
			"menuRadiology" : "X-Ray",
			"menuSurgery" : "Surgery",
			"menuGamehost" : "Gamehost",
			"menuAdmin" : "Administrator"
		}
	},
	
	// @endregion

	// @region GAMER
	
		// @region GAMERMENU
		
			// component gamerMenu	
			"gamerMenu" : {
		
				"de" : {
					"richTextManagement" : "Management",
					"richTextCare" : "Pflege",
					"richTextRadiology" : "R\u00f6ntgen",
					"richTextSurgery" : "OP"
				},
			
				"en" : {
					"richTextManagement" : "Management",
					"richTextCare" : "Care",
					"richTextRadiology" : "Radiology",
					"richTextSurgery" : "Surgery"
				}
			},
		
		// @endregion

		// @region GAMECENTER
		
			// component gamerGamecenter	
			"gamerGamecenter" : {
		
				"de" : {
					"richTextWelcome" : "Willkommen im Spielzentrum der Spieler"
				},
			
				"en" : {
					"richTextWelcome" : "Welcome to the gamecenter of the gamer"
				}
			},
		
		// @endregion
	
		// @region MANAGEMENT
		
			// component gamerManagementHome
			"gamerManagementHome" : {
			
				"de" : {
					"richTextWelcome" : "Willkommen in der Managementabteilung"
				},
		
				"en" : {
					"richTextWelcome" : "Welcome to the management department"
				}
			},
		
		// @endregion
	
		// @region NURSING
		
			// component gamerNursingHome
			"gamerNursingHome" : {
			
				"de" : {
					"richTextWelcome" : "Willkommen in der Pflegeabteilung" 
				},
		
				"en" : {
					"richTextWelcome" : "Welcome to the nursing department"
				}
			},
		
		// @endregion
	
		// @region RADIOLOGY

			// component gamerRadiologyHome
			"gamerRadiologyHome" : {
			
				"de" : {
					"richTextWelcome" : "Willkommen in der R\u00f6ntgenabteilung" 
				},
		
				"en" : {
					"richTextWelcome" : "Welcome to the radiology department"
				}
			},
	
		// @endregion

		// @region SURGERY

			// component gamerSurgeryHome
			"gamerSurgeryHome" : {
			
				"de" : {
					"richTextWelcome" : "Willkommen im OP" 
				},
		
				"en" : {
					"richTextWelcome" : "Welcome to the surgery department"
				}
			},
			
		// @endregion
		
	// @endregion

	// @region GAMEHOST
	
		// @region HOME
		
			// component gamehostHome
			"gamehostHome" : {
		
				"de" : {
					"richTextWelcome" : "Willkommen im Spielleiterbereich"
				},
			
				"en" : {
					"richTextWelcome" : "Welcome to the gamehost section"
				}
			},
		
		// @endregion
		
		// @region GAMEHOSTMENU
		
			// component gamehostMenu
			"gamehostMenu" : {
		
				"de" : {
					"richTextFinancing" : "Finanzierung",
					"richTextHospitals" : "Krankenh\u00e4ser",
					"richTextEmergencies" : "Notf\u00e4lle",
					"richTextPatients" : "Patienten",
					"richTextManagement" : "Management",
					"richTextCare" : "Pflege",
					"richTextRadiology" : "R\u00f6ntgen",
					"richTextSurgery" : "OP",
					"richTextTargetValues" : "Zielgr\u00f6\u00dfen",
					"richTextResultWeighting" : "Ergebnisgewichtung"
					
				},
			
				"en" : {
					"richTextFinancing" : "Financing",
					"richTextHospitals" : "Hospitals",
					"richTextEmergencies" : "Emergencies",
					"richTextPatients" : "Patients",
					"richTextManagement" : "Management",
					"richTextCare" : "Care",
					"richTextRadiology" : "Radiology",
					"richTextSurgery" : "Surgery",
					"richTextTargetValues" : "Target values",
					"richTextResultWeighting" : "Weighting of results"
				}
			},
		
		// @endregion
	
	// @endregion

	// @region ADMINISTRATOR
	
		// @region HOME
		
			// component administratorHome	
			"administratorHome" : {
		
				"de" : {
					"richTextWelcome" : "Willkommen im Administratorbereich"
				},
			
				"en" : {
					"richTextWelcome" : "Welcome to the admin section"
				}
			}
		
		// @endregion
	
	// @endregion

};


// Call the translation object
function translate (page,field) {
	return translations[page][sessionStorage.getItem("language")][field];
};