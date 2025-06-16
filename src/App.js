import React, { useState, useEffect } from 'react';
import './App.css';

const DadOS = () => {
  const [openApps, setOpenApps] = useState([]); // [{ id: 'jokes', minimized: false }]
  const [minimizedApps, setMinimizedApps] = useState([]);
  const [maximizedApps, setMaximizedApps] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Default content that can be edited
  const [dadJokes, setDadJokes] = useState([
    "Why don't scientists trust atoms? Because they make up everything!",
    "I told my wife she was drawing her eyebrows too high. She looked surprised.",
    "Why did the scarecrow win an award? He was outstanding in his field!",
    "I used to hate facial hair, but then it grew on me.",
    "What do you call a fake noodle? An impasta!",
    "Why don't eggs tell jokes? They'd crack each other up!"
  ]);

  const [achievements, setAchievements] = useState([
    { title: "WiFi Wizard", description: "Successfully fixed the internet for the 100th time", icon: "🧙‍♂️" },
    { title: "Pancake Master", description: "Flipped pancakes with perfect precision every Sunday", icon: "🥞" },
    { title: "Dad Joke Legend", description: "Made everyone groan with laughter simultaneously", icon: "😂" },
    { title: "BBQ Champion", description: "Grilled the perfect steak every single time", icon: "🔥" },
    { title: "Fix-It Hero", description: "Repaired things that seemed impossible to fix", icon: "🔧" },
    { title: "Hug Master", description: "Gave the best hugs in the known universe", icon: "🤗" }
  ]);

  const [reasons, setReasons] = useState([
    "You always know how to make me laugh, even on the toughest days",
    "Your wisdom and advice have guided me through so many challenges",
    "You taught me the value of hard work and perseverance",
    "Your dad jokes are legendary (even if we pretend to groan)",
    "You're always there when I need you, no matter what",
    "You showed me how to be kind and generous to others",
    "Your strength and resilience inspire me every day",
    "You make the best pancakes and tell the best stories"
  ]);

  const [lessons, setLessons] = useState([
    {
      title: "How to Fix Anything with Patience",
      content: "You taught me that most problems can be solved if you just take your time and think it through. 'Don't force it,' you'd say, 'understand it first.'"
    },
    {
      title: "The Art of Making People Feel Welcome",
      content: "Watching you welcome every guest into our home with genuine warmth showed me what true hospitality means. Everyone always felt like family around you."
    }
  ]);

  const [familyMessages, setFamilyMessages] = useState([
    { name: "Mom", message: "Your father has the biggest heart and always puts family first. He's my partner in everything." },
    { name: "Sister", message: "Dad, you're the funniest person I know and you always believe in me, even when I don't believe in myself." },
    { name: "Brother", message: "Thanks for teaching me how to throw a baseball and how to be a good person. You're my hero." },
    { name: "Grandma", message: "I'm so proud of the man you've become and the father you are to my grandchildren." },
    { name: "Family Friend", message: "You've always been like a second father to me. Thank you for your kindness and wisdom over the years." }
  ]);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Load saved content from localStorage
  useEffect(() => {
    const savedJokes = localStorage.getItem('dadJokes');
    const savedAchievements = localStorage.getItem('achievements');
    const savedReasons = localStorage.getItem('reasons');
    const savedLessons = localStorage.getItem('lessons');
    const savedFamilyMessages = localStorage.getItem('familyMessages');
    
    if (savedJokes) setDadJokes(JSON.parse(savedJokes));
    if (savedAchievements) setAchievements(JSON.parse(savedAchievements));
    if (savedReasons) setReasons(JSON.parse(savedReasons));
    if (savedLessons) setLessons(JSON.parse(savedLessons));
    if (savedFamilyMessages) setFamilyMessages(JSON.parse(savedFamilyMessages));
  }, []);

  // Save content to localStorage
  const saveContent = () => {
    localStorage.setItem('dadJokes', JSON.stringify(dadJokes));
    localStorage.setItem('achievements', JSON.stringify(achievements));
    localStorage.setItem('reasons', JSON.stringify(reasons));
    localStorage.setItem('lessons', JSON.stringify(lessons));
    localStorage.setItem('familyMessages', JSON.stringify(familyMessages));
  };

  const apps = [
    { id: 'jokes', name: 'Dad Jokes Terminal', icon: '😂', color: 'amber' },
    { id: 'achievements', name: 'Hall of Fame', icon: '🏆', color: 'gold' },
    { id: 'reasons', name: 'Why You Rock', icon: '❤️', color: 'warm-red' },
    { id: 'lessons', name: 'Life Lessons', icon: '📚', color: 'sage' },
    { id: 'family', name: 'Family Messages', icon: '👨‍👩‍👧‍👦', color: 'warm-blue' },
    { id: 'memories', name: 'Memory Bank', icon: '📸', color: 'vintage' }
  ];

  const openApp = (appId) => {
    if (!openApps.includes(appId)) {
      setOpenApps([...openApps, appId]);
    }
  };

  const closeApp = (appId) => {
    setOpenApps(openApps.filter(id => id !== appId));
  };

  const renderApp = (appId) => {
    switch (appId) {
      case 'jokes':
        return <DadJokesTerminal jokes={dadJokes} isEditMode={isEditMode} setJokes={setDadJokes} />;
      case 'achievements':
        return <AchievementsApp achievements={achievements} isEditMode={isEditMode} setAchievements={setAchievements} />;
      case 'reasons':
        return <ReasonsApp reasons={reasons} isEditMode={isEditMode} setReasons={setReasons} />;
      case 'lessons':
        return <LessonsApp lessons={lessons} isEditMode={isEditMode} setLessons={setLessons} />;
      case 'family':
        return <FamilyMessagesApp familyMessages={familyMessages} isEditMode={isEditMode} setFamilyMessages={setFamilyMessages} />;
      case 'memories':
        return <MemoryVault isEditMode={isEditMode} />;
      default:
        return null;
    }
  };
    const [notePosition, setNotePosition] = useState({ x: 60, y: 100 });
  const [dragging, setDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handleNoteDragStart = (e) => {
    setDragging(true);
    setDragOffset({
      x: e.clientX - notePosition.x,
      y: e.clientY - notePosition.y
    });
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (dragging) {
        setNotePosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y
        });
      }
    };

    const handleMouseUp = () => setDragging(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging, dragOffset]);
  return (
    <div className="computer-setup">
      {/* Room Background */}
      <div className="room-background">A
        {/* Vintage Monitor Frame */}
        <div className="vintage-monitor">
          <div className="monitor-casing">
            <div className="monitor-screen">
              <div className="screen-glass">
                {/* DadOS Interface */}
                <div className="dads-os">
                  <div
                    className="desktop-background"
                    style={{
                      backgroundImage: "url('/wallpaper.jpg')",
                       backgroundSize: "cover",
                       backgroundPosition: "center",
                         backgroundRepeat: "no-repeat"
  }}
>
                    {/* Top Menu Bar */}
                    <div className="top-menu-bar">
                      <div className="menu-left">
                        <span className="system-name">DadOS</span>
                        <span className="menu-item">File</span>
                        <span className="menu-item">Edit</span>
                        <span className="menu-item">View</span>
                      </div>
                      <div className="menu-right">
                        <span className="time">{currentTime.toLocaleTimeString()}</span>
                        <button 
                          className={`edit-toggle ${isEditMode ? 'active' : ''}`}
                          onClick={() => {
                            if (isEditMode) saveContent();
                            setIsEditMode(!isEditMode);
                          }}
                        >
                          {isEditMode ? 'Save' : 'Edit'}
                        </button>
                      </div>
                    </div>

                    {/* Desktop Area with Wallpaper */}
                    <div className="desktop-area">
                      {/* Desktop Icons - Proportionally Spaced */}
                      <div className="desktop-icons">
                        {apps.map((app, index) => (
                          <div 
                            key={app.id}
                            className={`desktop-icon ${app.color}`}
                            onClick={() => openApp(app.id)}
                            style={{
                              gridColumn: `${(index % 3) + 1}`,
                              gridRow: `${Math.floor(index / 3) + 1}`
                            }}
                          >
                            <div className="icon-symbol">{app.icon}</div>
                            <div className="icon-label">{app.name}</div>
                          </div>
                        ))}
                      </div>
                        <div
  className="quick-note"
  style={{
    top: notePosition.y,
    left: notePosition.x,
    position: 'absolute'
  }}
  onMouseDown={handleNoteDragStart}
>
  <div className="quick-note-header">
    📝 Quick note
  </div>
  <div className="quick-note-content">
    ¡Feliz Día del Padre!<br />
    Te queremos mucho 💛
  </div>
</div>
                      {/* App Windows */}
                      {openApps
                          .filter(appId => !minimizedApps.includes(appId))  // 💐 hide minimized
                         .map(appId => {
                        const app = apps.find(a => a.id === appId);
                        return (
                          <div
                         key={appId}
                      className={`app-window ${app.color} ${maximizedApps.includes(appId) ? 'maximized' : ''}`}
                    >
                            <div className="window-header">
                              <div className="window-controls">
                                <span className="window-control close" onClick={() => closeApp(appId)}>×</span>
                                <span className="window-control minimize" onClick={() => {
                                    setMinimizedApps([...minimizedApps, appId]);
                                    }}>
                                     −
                                </span>
                                 <span className="window-control maximize" onClick={() => {
                                if (maximizedApps.includes(appId)) {
                                // Unmaximize it
                               setMaximizedApps(maximizedApps.filter(id => id !== appId));
                                 } else {
                               // Maximize it
                              setMaximizedApps([...maximizedApps, appId]);
                              }
                            }}>
                             □
                            </span>
                              </div>
                              <span className="window-title">{app.icon} {app.name}</span>
                              <div className="window-spacer"></div>
                            </div>
                            <div className="window-content">
                              {renderApp(appId)}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Bottom Taskbar */}
                    <div className="taskbar">
                      <div className="start-button">
                        <span className="start-icon">🏠</span>
                        <span>Start</span>
                      </div>
                      <div className="taskbar-separator"></div>
                      <div className="taskbar-apps">
                        {apps.map(app => (
                          <div 
                            key={app.id}
                            className={`taskbar-app ${openApps.includes(app.id) ? 'active' : ''}`}
                            onClick={() => {
                            if (openApps.includes(app.id)) {
                           if (minimizedApps.includes(app.id)) {
                            // 💐 Restore if minimized
                            setMinimizedApps(minimizedApps.filter(id => id !== app.id));
                          }
                         } else {
                       openApp(app.id); // 💐 Open if not open yet
                          }
}}
                            title={app.name}
                          >
                            <span className="taskbar-icon">{app.icon}</span>
                          </div>
                        ))}
                      </div>
                      <div className="taskbar-system">
                        <div className="system-tray">
                          <span className="tray-icon">🔊</span>
                          <span className="tray-icon">📶</span>
                          <span className="tray-icon">🔋</span>
                        </div>
                        <div className="taskbar-clock">
                          {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Monitor Stand and Base */}
          <div className="monitor-neck"></div>
          <div className="monitor-base"></div>
        </div>
      </div>
    </div>
  );
};

// Dad Jokes Terminal Component
const DadJokesTerminal = ({ jokes, isEditMode, setJokes }) => {
  const [currentJoke, setCurrentJoke] = useState('');
  const [terminalHistory, setTerminalHistory] = useState([
    '> DadOS Joke Terminal v1.0 initialized...',
    '> Loading joke database...',
    '> Ready to deploy maximum dad humor!'
  ]);

  const getRandomJoke = () => {
    const joke = jokes[Math.floor(Math.random() * jokes.length)];
    setCurrentJoke(joke);
    setTerminalHistory([...terminalHistory, `> ${joke}`]);
  };

  const addJoke = (newJoke) => {
    setJokes([...jokes, newJoke]);
  };

  const removeJoke = (index) => {
    setJokes(jokes.filter((_, i) => i !== index));
  };

  return (
    <div className="terminal">
      <div className="terminal-header">
        <span>DAD_JOKES.EXE</span>
      </div>
      <div className="terminal-content">
        {terminalHistory.map((line, index) => (
          <div key={index} className="terminal-line">{line}</div>
        ))}
        
        <div className="terminal-controls">
          <button className="terminal-btn" onClick={getRandomJoke}>
            GET_JOKE.EXE
          </button>
        </div>

        {isEditMode && (
          <div className="edit-section">
            <h4>Edit Jokes:</h4>
            {jokes.map((joke, index) => (
              <div key={index} className="edit-item">
                <input 
                  value={joke} 
                  onChange={(e) => {
                    const newJokes = [...jokes];
                    newJokes[index] = e.target.value;
                    setJokes(newJokes);
                  }}
                />
                <button onClick={() => removeJoke(index)}>Delete</button>
              </div>
            ))}
            <button onClick={() => addJoke('New joke here!')}>Add Joke</button>
          </div>
        )}
      </div>
    </div>
  );
};

// Achievements Component
const AchievementsApp = ({ achievements, isEditMode, setAchievements }) => {
  const addAchievement = () => {
    setAchievements([...achievements, { 
      title: 'New Achievement', 
      description: 'Edit this achievement', 
      icon: '⭐' 
    }]);
  };

  const updateAchievement = (index, field, value) => {
    const newAchievements = [...achievements];
    newAchievements[index][field] = value;
    setAchievements(newAchievements);
  };

  const removeAchievement = (index) => {
    setAchievements(achievements.filter((_, i) => i !== index));
  };

  return (
    <div className="achievements-app">
      <h2>🏆 Hall of Fame</h2>
      <div className="achievements-grid">
        {achievements.map((achievement, index) => (
          <div key={index} className="achievement-card">
            <div className="achievement-icon">{achievement.icon}</div>
            {isEditMode ? (
              <div className="edit-achievement">
                <input 
                  value={achievement.title}
                  onChange={(e) => updateAchievement(index, 'title', e.target.value)}
                  placeholder="Achievement Title"
                />
                <input 
                  value={achievement.description}
                  onChange={(e) => updateAchievement(index, 'description', e.target.value)}
                  placeholder="Description"
                />
                <input 
                  value={achievement.icon}
                  onChange={(e) => updateAchievement(index, 'icon', e.target.value)}
                  placeholder="Icon"
                />
                <button onClick={() => removeAchievement(index)}>Delete</button>
              </div>
            ) : (
              <div>
                <h3>{achievement.title}</h3>
                <p>{achievement.description}</p>
              </div>
            )}
          </div>
        ))}
      </div>
      {isEditMode && (
        <button className="add-btn" onClick={addAchievement}>Add Achievement</button>
      )}
    </div>
  );
};

// Reasons App Component
const ReasonsApp = ({ reasons, isEditMode, setReasons }) => {
  const addReason = () => {
    setReasons([...reasons, 'New reason here...']);
  };

  const updateReason = (index, value) => {
    const newReasons = [...reasons];
    newReasons[index] = value;
    setReasons(newReasons);
  };

  const removeReason = (index) => {
    setReasons(reasons.filter((_, i) => i !== index));
  };

  return (
    <div className="reasons-app">
      <h2>❤️ Why You Rock</h2>
      <div className="reasons-list">
        {reasons.map((reason, index) => (
          <div key={index} className="reason-item">
            {isEditMode ? (
              <div className="edit-reason">
                <textarea 
                  value={reason}
                  onChange={(e) => updateReason(index, e.target.value)}
                />
                <button onClick={() => removeReason(index)}>Delete</button>
              </div>
            ) : (
              <p>"{reason}"</p>
            )}
          </div>
        ))}
      </div>
      {isEditMode && (
        <button className="add-btn" onClick={addReason}>Add Reason</button>
      )}
    </div>
  );
};

// Life Lessons Component
const LessonsApp = ({ lessons, isEditMode, setLessons }) => {
  const addLesson = () => {
    setLessons([...lessons, { title: 'New Life Lesson', content: 'What did you learn from dad?' }]);
  };

  const updateLesson = (index, field, value) => {
    const newLessons = [...lessons];
    newLessons[index][field] = value;
    setLessons(newLessons);
  };

  const removeLesson = (index) => {
    setLessons(lessons.filter((_, i) => i !== index));
  };

  return (
    <div className="lessons-app">
      <h2>📚 Life Lessons from Dad</h2>
      <div className="lessons-container">
        {lessons.map((lesson, index) => (
          <div key={index} className="lesson-card">
            {isEditMode ? (
              <div className="edit-lesson">
                <input 
                  value={lesson.title}
                  onChange={(e) => updateLesson(index, 'title', e.target.value)}
                  placeholder="Lesson Title"
                  className="lesson-title-input"
                />
                <textarea 
                  value={lesson.content}
                  onChange={(e) => updateLesson(index, 'content', e.target.value)}
                  placeholder="What did you learn?"
                  className="lesson-content-input"
                />
                <button onClick={() => removeLesson(index)}>Delete Lesson</button>
              </div>
            ) : (
              <div>
                <h3>{lesson.title}</h3>
                <p>{lesson.content}</p>
              </div>
            )}
          </div>
        ))}
      </div>
      {isEditMode && (
        <button className="add-btn" onClick={addLesson}>Add Life Lesson</button>
      )}
      {lessons.length < 10 && !isEditMode && (
        <div className="lesson-slots">
          <p>Space for {10 - lessons.length} more life lessons...</p>
        </div>
      )}
    </div>
  );
};

// Family Messages Component
const FamilyMessagesApp = ({ familyMessages, isEditMode, setFamilyMessages }) => {
  const updateMessage = (index, field, value) => {
    const newMessages = [...familyMessages];
    newMessages[index][field] = value;
    setFamilyMessages(newMessages);
  };

  return (
    <div className="family-app">
      <h2>👨‍👩‍👧‍👦 Messages from the Family</h2>
      <div className="family-messages">
        {familyMessages.map((member, index) => (
          <div key={index} className="family-card">
            {isEditMode ? (
              <div className="edit-family-message">
                <input 
                  value={member.name}
                  onChange={(e) => updateMessage(index, 'name', e.target.value)}
                  placeholder="Family Member Name"
                  className="family-name-input"
                />
                <textarea 
                  value={member.message}
                  onChange={(e) => updateMessage(index, 'message', e.target.value)}
                  placeholder="Message for Dad"
                  className="family-message-input"
                />
              </div>
            ) : (
              <div>
                <h3>From: {member.name}</h3>
                <p>"{member.message}"</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Memory Vault Component
const MemoryVault = ({ isEditMode }) => {
  const [memories, setMemories] = useState([]);

 

  useEffect(() => {
    const savedMemories = localStorage.getItem('memories');
    if (savedMemories) {
      setMemories(JSON.parse(savedMemories));
    }
  }, []);

  const saveMemories = (newMemories) => {
    setMemories(newMemories);
    localStorage.setItem('memories', JSON.stringify(newMemories));
  };

  const addMemory = (imageData, caption) => {
    const newMemory = { 
      id: Date.now(),
      image: imageData,
      caption: caption || 'New memory'
    };
    saveMemories([...memories, newMemory]);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        addMemory(e.target.result, 'New memory - add caption!');
      };
      reader.readAsDataURL(file);
    }
  };

  const updateCaption = (id, newCaption) => {
    const updatedMemories = memories.map(memory => 
      memory.id === id ? { ...memory, caption: newCaption } : memory
    );
    saveMemories(updatedMemories);
  };

  const removeMemory = (id) => {
    saveMemories(memories.filter(memory => memory.id !== id));
  };
  return (
    <div className="memory-vault">
      <h2>📸 Memory Bank</h2>

      {isEditMode && (
        <div className="upload-section">
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleImageUpload}
            id="image-upload"
          />
          <label htmlFor="image-upload" className="upload-btn">
            Upload Memory
          </label>
        </div>
      )}

      <div className="memories-grid">
        {memories.map(memory => (
          <div key={memory.id} className="memory-card">
            <img 
            src={memory.image} 
            alt="Memory"
             style={{ cursor: 'default' }}
            />
            {isEditMode ? (
              <div className="edit-memory">
                <input 
                  value={memory.caption}
                  onChange={(e) => updateCaption(memory.id, e.target.value)}
                />
                <button onClick={() => removeMemory(memory.id)}>Delete</button>
              </div>
            ) : (
              <p>{memory.caption}</p>
            )}
          </div>
        ))}
      </div>

      {memories.length === 0 && (
        <p className="empty-state">
          {isEditMode ? 'Upload some photos to get started!' : 'No memories yet.'}
        </p>
      )}
    </div>
  );
};
export default DadOS;