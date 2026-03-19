/* ============================================================
   DATA — All static content: drills, tips, plans, gear
   ============================================================ */

// ── Drills (15 total) ──────────────────────────────────────
export const drills = [
  {
    id: 'half-compression',
    title: 'Half Swing Compression',
    description: 'Build centre-strike feel with controlled half swings. Teaches ball-first contact and forward shaft lean at impact.',
    defaultMinutes: 10,
    equipment: [],
    locations: ['home', 'range'],
    focus: ['irons', 'balanced'],
    cues: [
      'Hands ahead of clubhead at impact',
      'Feel the shaft leaning toward the target',
      'Ball then turf — small divot after the ball',
      'Hold finish at waist height for 2 seconds'
    ],
    steps: [
      'Use a 7-iron or 8-iron',
      'Take the club back to 9 o\'clock (hands at hip height)',
      'Focus on striking the ball first, then the ground',
      'Feel the hands leading the clubhead through impact',
      'Finish at 3 o\'clock with weight on front foot',
      'Repeat 10 shots, then gradually increase to ¾ swings'
    ]
  },
  {
    id: 'slow-impact',
    title: 'Slow Impact Drill',
    description: 'Train proper impact position by swinging in slow motion. Place a towel 2 inches behind the ball to force ball-first contact.',
    defaultMinutes: 5,
    equipment: [],
    locations: ['home', 'range'],
    focus: ['irons', 'balanced'],
    cues: [
      'Weight 70% on front foot at impact',
      'Hands ahead — shaft leaning forward',
      'Miss the towel, hit the ball',
      'Compression, not scooping'
    ],
    steps: [
      'Place a small towel or headcover 2 inches behind the ball',
      'Use a PW or 9-iron',
      'Make a slow-motion swing at 30% speed',
      'Focus on striking the ball without touching the towel',
      'If you hit the towel, you\'re bottoming out too early (chunking)',
      'Do 10 reps, gradually increase speed to 50%'
    ]
  },
  {
    id: 'gate-drill',
    title: 'Gate Drill',
    description: 'Use alignment sticks to create a gate for the clubhead. Trains an inside-out path and eliminates the slice.',
    defaultMinutes: 8,
    equipment: ['alignment-sticks'],
    locations: ['home', 'range'],
    focus: ['driver', 'balanced'],
    cues: [
      'Swing through the gate, not across it',
      'Feel the club exiting right of target (for a draw)',
      'Square face through the gate',
      'Slow tempo — accuracy over speed'
    ],
    steps: [
      'Place two alignment sticks in the ground, angled to create a gate just wider than the clubhead',
      'Position the gate on your target line, just ahead of the ball',
      'Make slow swings passing the club through the gate',
      'If you hit the outside stick, your path is outside-in (slice path)',
      'Focus on an inside-out path through the gate',
      'Start with half swings, build to full swings'
    ]
  },
  {
    id: 'pump-drill',
    title: 'Pump Drill',
    description: 'Rehearse the transition from backswing to downswing. Builds lag and prevents casting / early release.',
    defaultMinutes: 8,
    equipment: [],
    locations: ['home', 'range'],
    focus: ['driver', 'irons', 'balanced'],
    cues: [
      'Hips start the downswing, not the hands',
      'Feel the wrists stay hinged through the pump',
      'Don\'t release until the hands pass the trail thigh',
      'Smooth tempo — 3 count back, 1 count down'
    ],
    steps: [
      'Take a normal backswing position',
      'Start the downswing but STOP when hands reach hip height',
      'Check: wrists should still be fully hinged, shaft pointing upward',
      'Return to the top of the backswing',
      'Repeat the pump 2-3 times',
      'On the final pump, complete the swing through to a full finish',
      'Do 5 sets of pump-then-hit'
    ]
  },
  {
    id: 'tempo-swings',
    title: 'Tempo Swings',
    description: 'Practice with a smooth 3:1 tempo ratio. Builds consistency and prevents over-swinging.',
    defaultMinutes: 6,
    equipment: [],
    locations: ['home', 'range'],
    focus: ['driver', 'balanced'],
    cues: [
      '"One… two… three" on the backswing, "four" on the down',
      'Swing at 70% effort — max distance comes from centre hits',
      'Hold the finish for 2 full seconds',
      'Balance check: can you hold your finish without wobbling?'
    ],
    steps: [
      'Use any club (start with a 7-iron)',
      'Count "1, 2, 3" slowly during the backswing',
      'Count "4" on the downswing and through impact',
      'Hold the finish position for 2 seconds',
      'If you lose balance, you\'re swinging too hard',
      'Hit 10 balls at 70% effort, then 5 at 80%',
      'Never exceed 85% effort — let the club do the work'
    ]
  },
  {
    id: 'wedge-ladder',
    title: 'Wedge Ladder',
    description: 'Hit wedges to progressively longer targets. Builds distance control and consistent contact.',
    defaultMinutes: 10,
    equipment: [],
    locations: ['home', 'range'],
    focus: ['shortGame', 'balanced'],
    cues: [
      'Same tempo for every distance — change backswing length',
      'Weight stays forward throughout',
      'Hands ahead at impact — let the loft do the work',
      'Land the ball, don\'t fly it to the target'
    ],
    steps: [
      'Use your PW or sand wedge',
      'Pick targets at 20, 40, 60, and 80 metres (or yards)',
      'Hit 3 balls to each target, starting with the shortest',
      'Control distance by backswing length, NOT by swing speed',
      'Track how many land within 5 metres of each target',
      'Work back down the ladder: 80 → 60 → 40 → 20'
    ]
  },
  {
    id: 'putting-ladder',
    title: 'Putting Ladder',
    description: 'Putt to progressively longer distances. Develops pace control — the #1 putting skill.',
    defaultMinutes: 8,
    equipment: ['putting-mat'],
    locations: ['home', 'range'],
    focus: ['shortGame', 'balanced'],
    cues: [
      'Eyes over the ball, shoulders rock like a pendulum',
      'Same tempo — longer stroke = longer putt',
      'The ball should die at the hole, not race past',
      'Focus on pace first, line second'
    ],
    steps: [
      'Set targets at 3, 6, 9, and 12 feet (1, 2, 3, 4 metres)',
      'Putt 3 balls to each distance, starting with the shortest',
      'Each ball must finish past the previous one but not beyond the next target',
      'If any ball finishes short or long, restart that distance',
      'Work back down: 12 → 9 → 6 → 3 feet',
      'Track your best streak of consecutive successful putts'
    ]
  },
  {
    id: 'seven-iron-strike-ladder',
    title: '7-Iron Strike Ladder',
    description: 'Progressive strike quality drill. Start with chips and build to full swings — only advance when strikes feel solid.',
    defaultMinutes: 15,
    equipment: [],
    locations: ['range'],
    focus: ['irons', 'balanced'],
    cues: [
      'You earn the right to swing bigger with solid contact',
      'If you thin or top one, drop back a level',
      'Centre contact > distance every time'
    ],
    steps: [
      'Start with chip shots (clubhead barely past the ball)',
      'Hit 5 solid chips in a row — "solid" = centred contact, clean turf interaction',
      'Advance to pitch shots (half swing)',
      'Hit 5 solid pitches in a row',
      'Advance to ¾ swings, then full swings',
      'If you thin, top, or chunk at any level, drop back one level',
      'Track how far you get in 15 minutes'
    ]
  },
  {
    id: 'driver-start-line',
    title: 'Driver Start-Line Build',
    description: 'Progressive driver drill focused on starting the ball on your target line. Controls face angle at impact.',
    defaultMinutes: 15,
    equipment: ['alignment-sticks'],
    locations: ['range'],
    focus: ['driver'],
    cues: [
      'Ball position: inside left heel',
      'Trail shoulder slightly lower than lead',
      'Sweep up through impact — don\'t hit down on driver',
      'Start line matters more than where it finishes'
    ],
    steps: [
      'Place an alignment stick on the ground pointing at your target',
      'Tee up and aim to start the ball within 10 metres of the stick line',
      'Start at 50% swing speed for the first 5 balls',
      'Build to 70%, then 80% — never above 85%',
      'Track how many out of 10 start on your intended line',
      'A gentle fade is perfectly fine — just control the start direction'
    ]
  },
  {
    id: 'towel-strike',
    title: 'Towel Strike Drill',
    description: 'Place a towel flat 2 inches behind the ball. Forces ball-first contact and eliminates chunking.',
    defaultMinutes: 8,
    equipment: [],
    locations: ['home', 'range'],
    focus: ['irons', 'shortGame'],
    cues: [
      'Ball first, turf second — NEVER towel first',
      'Weight forward at address and impact',
      'Hands lead the clubhead through impact',
      'If you hit the towel, your low point is too far back'
    ],
    steps: [
      'Fold a small towel and place it flat, 2 inches behind the ball',
      'Use a PW or 9-iron',
      'Hit the ball without disturbing the towel',
      'If you catch the towel, focus on shifting weight forward first',
      'Start with chip-sized swings, build up only when consistent',
      'Goal: 8 out of 10 clean misses of the towel'
    ]
  },
  {
    id: 'feet-together-driver',
    title: 'Feet-Together Driver',
    description: 'Hit driver with feet together. Forces balance, tempo, and prevents over-swinging.',
    defaultMinutes: 8,
    equipment: [],
    locations: ['home', 'range'],
    focus: ['driver'],
    cues: [
      'If you can\'t hit it with feet together, you\'re swinging too hard',
      'Feel the body turn, not the arms lifting',
      'This is about face control and balance, not distance',
      'Smooth tempo — you\'ll be surprised how far it still goes'
    ],
    steps: [
      'Tee the ball up normally',
      'Stand with feet touching (or just 2 inches apart)',
      'Make a smooth, balanced swing at 60% effort',
      'Focus on finishing in balance — hold the finish 3 seconds',
      'Hit 10 balls, note how many you can finish in balance',
      'Then widen to normal stance and keep that same tempo feel'
    ]
  },
  {
    id: 'alignment-path-drill',
    title: 'Alignment Stick Path Drill',
    description: 'Stick on the ground along your target line. Helps visualise and practice correct swing path.',
    defaultMinutes: 8,
    equipment: ['alignment-sticks'],
    locations: ['home', 'range'],
    focus: ['driver', 'irons'],
    cues: [
      'Club should travel parallel to the stick through impact',
      'For a slice fix: feel the club exit right of the stick',
      'Shoulders and feet must align parallel to the stick',
      'Don\'t aim your body at the target — aim parallel left'
    ],
    steps: [
      'Lay an alignment stick on the ground pointing at your target',
      'Place ball 6 inches to the near side of the stick',
      'Set up with feet, hips, and shoulders parallel to the stick',
      'Swing and check: does the clubhead travel along the stick or across it?',
      'For slice fix: place a second stick 2 feet ahead, angled slightly right',
      'Practice swinging the club toward the right-angled stick (inside-out path)'
    ]
  },
  {
    id: 'nine-to-three',
    title: '9-to-3 Iron Drill',
    description: 'Controlled half swings (9 o\'clock to 3 o\'clock) with irons. Builds compression and centre contact.',
    defaultMinutes: 10,
    equipment: [],
    locations: ['home', 'range'],
    focus: ['irons'],
    cues: [
      'Arms to 9 o\'clock back, 3 o\'clock through',
      'Ball should fly about 60% of full distance',
      'If 9-to-3 with a 7-iron goes as far as your full 7-iron, you\'re hitting full shots thin',
      'This is your benchmark for pure contact'
    ],
    steps: [
      'Use a 7-iron',
      'Swing back to 9 o\'clock (hands at hip height)',
      'Swing through to 3 o\'clock (hands at hip height on follow-through)',
      'Ball should fly about 60% of your full 7-iron distance',
      'Hit 10 balls, note the average distance',
      'If the 9-to-3 goes nearly as far as full swing, your full swing is thin/topped',
      'Use this as a warm-up benchmark every practice session'
    ]
  },
  {
    id: 'impact-bag-drill',
    title: 'Impact Bag Drill',
    description: 'Drive hands into an impact bag to feel proper shaft lean and forward press at impact.',
    defaultMinutes: 8,
    equipment: ['impact-bag'],
    locations: ['home'],
    focus: ['irons', 'shortGame'],
    cues: [
      'Hands ahead of the bag at impact — shaft leans forward',
      'Weight on front foot when you hit the bag',
      'Feel the lead wrist flat or slightly bowed',
      'This is what compression feels like'
    ],
    steps: [
      'Place the impact bag where the ball would normally be',
      'Take your normal stance with a mid-iron',
      'Make a slow backswing to ¾',
      'Drive into the bag — check: hands ahead, weight forward, shaft leaning toward target',
      'Hold the impact position for 3 seconds and check your positions',
      'Repeat 10 times, then make practice swings without the bag, recreating the feel'
    ]
  },
  {
    id: 'chipping-ladder',
    title: 'Chipping Ladder',
    description: 'Chip to progressively longer targets. Builds feel for distance and landing spot control.',
    defaultMinutes: 10,
    equipment: ['foam-balls'],
    locations: ['home', 'range'],
    focus: ['shortGame'],
    cues: [
      'Weight forward, hands forward — always',
      'Let the bounce of the club work — don\'t dig',
      'Pick a landing spot, not a finishing spot',
      'Same motion, different club = different distances'
    ],
    steps: [
      'Set targets at 5, 10, 15, and 20 paces',
      'Use a PW for the shortest, then 8-iron, 7-iron for longer chips',
      'Hit 3 chips to each target, focus on landing spot accuracy',
      'The ball should land on or near your chosen spot and release to the target',
      'Track how many out of 12 land within 2 paces of the landing spot',
      'Vary the clubs to see how roll-out changes with loft'
    ]
  }
];

// ── Situational Tips ───────────────────────────────────────
export const situationalTips = [
  {
    id: 'uphill-lie',
    scenario: 'Uphill Lie',
    icon: '⛰️',
    tip: 'Ball will fly higher and left. Take one extra club and aim slightly right of target.',
    cues: [
      'Set shoulders parallel to the slope (trail shoulder lower)',
      'Ball position slightly forward of normal',
      'Swing with the slope — don\'t fight it',
      'Expect a higher, shorter shot'
    ],
    mistake: 'Leaning into the hill and hitting behind the ball. Let your body match the slope angle.'
  },
  {
    id: 'downhill-lie',
    scenario: 'Downhill Lie',
    icon: '🏔️',
    tip: 'Ball will fly lower and right. Take one less club, aim slightly left, and commit to the swing.',
    cues: [
      'Weight stays on the downhill (front) foot',
      'Ball position slightly back of normal',
      'Swing down the slope — chase the ball with the clubhead',
      'Accept a lower ball flight'
    ],
    mistake: 'Trying to help the ball up. Trust the loft and swing down with the slope.'
  },
  {
    id: 'ball-above-feet',
    scenario: 'Ball Above Feet',
    icon: '↗️',
    tip: 'Ball will draw/hook left. Aim right of target, grip down on the club, and stand taller.',
    cues: [
      'Grip down 1-2 inches for control',
      'Aim right to compensate for the natural draw',
      'Stand more upright — the ball is closer to you',
      'Make a more U-shaped swing (flatter)'
    ],
    mistake: 'Standing too close and losing balance forward. Give yourself room and stay balanced.'
  },
  {
    id: 'ball-below-feet',
    scenario: 'Ball Below Feet',
    icon: '↘️',
    tip: 'Ball will fade/slice right. Aim left of target, flex your knees more, and maintain your spine angle.',
    cues: [
      'Extra knee flex to get down to the ball',
      'Aim left to compensate for the fade',
      'Maintain your spine angle — don\'t stand up through the shot',
      'Grip at full length'
    ],
    mistake: 'Standing up through impact (early extension). Stay in your posture.'
  },
  {
    id: 'fairway-bunker',
    scenario: 'Fairway Bunker',
    icon: '🏖️',
    tip: 'Priority is clean contact. Take one extra club, dig feet in slightly, and pick the ball clean.',
    cues: [
      'Dig feet in for stability, then grip down to compensate',
      'Ball slightly back in stance',
      'Pick the ball CLEAN — you want ball-first contact, minimal sand',
      'Swing at 80% — control over distance'
    ],
    mistake: 'Hitting the sand first (fat shot). Focus on hitting the ball first, like a normal iron shot.'
  },
  {
    id: 'greenside-bunker',
    scenario: 'Greenside Bunker',
    icon: '⛳',
    tip: 'Open the clubface, aim left, and hit the sand 2 inches behind the ball. The sand lifts the ball out.',
    cues: [
      'Open the face BEFORE you grip — rotate the club, then hold it',
      'Aim your body 20-30° left of target',
      'Hit the sand 2 inches behind the ball',
      'Accelerate through — don\'t quit on the shot',
      'Follow through fully — short follow-through = ball stays in bunker'
    ],
    mistake: 'Trying to pick the ball clean or decelerating through impact. Commit to the splash!'
  },
  {
    id: 'deep-rough',
    scenario: 'Deep Rough',
    icon: '🌿',
    tip: 'The grass will grab the hosel and close the face. Open the face slightly, swing steeper, and accept a lower-control shot.',
    cues: [
      'Open the face slightly at address to counteract grass closing it',
      'Steeper swing — pick the club up more vertically on backswing',
      'Ball position centre or slightly back',
      'Don\'t try to be a hero — sometimes the smart play is a wedge back to the fairway'
    ],
    mistake: 'Going for a long club from deep rough. Rough kills distance and control — take your medicine.'
  },
  {
    id: 'punch-shot',
    scenario: 'Punch Under Trees',
    icon: '🌳',
    tip: 'Keep the ball low. Use a 5-6 iron, ball back in stance, hands way forward, abbreviated follow-through.',
    cues: [
      'Ball position back of centre (off trail foot)',
      'Hands well ahead at address and impact',
      '¾ backswing, abbreviated follow-through (hands finish chest height)',
      'Pick a line that has at least 5 feet of clearance'
    ],
    mistake: 'Using too much loft or making a full swing. Keep it simple — low and safe.'
  },
  {
    id: 'into-wind',
    scenario: 'Into the Wind',
    icon: '💨',
    tip: 'Take 1-2 extra clubs and swing easy. A hard swing creates more spin which makes the ball balloon.',
    cues: [
      'Club up (e.g., 6-iron instead of 8-iron)',
      'Swing at 75-80% effort — less spin = less ballooning',
      'Ball slightly back in stance for lower launch',
      '"When it\'s breezy, swing easy"'
    ],
    mistake: 'Swinging harder to fight the wind. More speed = more spin = more wind effect. Do the opposite.'
  },
  {
    id: 'downwind',
    scenario: 'Downwind',
    icon: '🌬️',
    tip: 'The wind will add distance but also reduce stopping power. Take 1-2 less clubs and plan for extra roll.',
    cues: [
      'Club down — the wind adds carry distance',
      'Normal swing — don\'t try to launch it high',
      'Plan for more roll-out on the green',
      'Great opportunity for a draw that runs out'
    ],
    mistake: 'Not adjusting club and being surprised when the ball flies over the green.'
  },
  {
    id: 'flop-shot',
    scenario: 'Flop Shot',
    icon: '🎯',
    tip: 'High risk, high reward. Open the face wide, swing along your body line (left), and accelerate. Only when you have a good lie.',
    cues: [
      'Only attempt from a GOOD lie (sitting up in light rough or fairway)',
      'Open the face wide — aim your body well left',
      'Full swing with full acceleration — you must commit',
      'The ball will come out high and soft with little roll'
    ],
    mistake: 'Trying this from a bad lie or decelerating. If in doubt, use a bump-and-run instead.'
  },
  {
    id: 'bump-and-run',
    scenario: 'Bump and Run',
    icon: '🏏',
    tip: 'The safer short game option. Use a 7-8 iron, hands forward, minimal wrist action. Let the ball run to the hole like a putt.',
    cues: [
      'Use a less-lofted club (7-iron, 8-iron, even a hybrid)',
      'Set up like a putt — narrow stance, ball back, hands forward',
      'Minimal wrist action — rock the shoulders',
      'Pick a landing spot 1/3 of the way to the hole, roll the rest'
    ],
    mistake: 'Using a wedge when you don\'t need to. The bump-and-run is the highest-percentage short game shot.'
  }
];

// ── Club Reminders ─────────────────────────────────────────
export const clubReminders = [
  {
    id: 'driver',
    club: 'Driver',
    icon: '🏌️',
    ballPosition: 'forward',
    cues: [
      'Ball inside lead heel',
      'Trail shoulder lower than lead — tilted spine',
      'Sweep up through the ball — don\'t hit down',
      'Tee height: half the ball above the clubface'
    ],
    fault: 'Slicing right',
    fix: 'Check grip (stronger = more closed face), swing inside-out through the Gate Drill, square face through impact. A slight fade is OK — just control the start line.'
  },
  {
    id: 'woods',
    club: 'Fairway Woods & Hybrids',
    icon: '🌲',
    ballPosition: 'forward',
    cues: [
      'Ball position forward of centre (1-2 inches inside lead heel)',
      'Sweep the ball — shallow angle of attack',
      'Let the club\'s low centre of gravity do the launching',
      'Don\'t try to help it up — trust the loft'
    ],
    fault: 'Topping or hitting thin',
    fix: 'Maintain your spine angle through the shot — don\'t stand up. Weight transfers to front foot. Ball-first contact with a shallow divot.'
  },
  {
    id: 'long-iron',
    club: 'Long Irons (3-5)',
    icon: '🔩',
    ballPosition: 'forward',
    cues: [
      'Ball slightly forward of centre',
      'Don\'t swing harder just because it\'s a long club',
      'Tempo and centre contact produce distance, not effort',
      'Accept that long irons fly lower — that\'s correct'
    ],
    fault: 'Thin/topped shots (low screamers that don\'t go far)',
    fix: 'Weight forward at impact, hands ahead of ball. If your 5-iron goes the same distance as your 8-iron, you\'re hitting the 5 thin. Use the 9-to-3 drill as a benchmark.'
  },
  {
    id: 'mid-iron',
    club: 'Mid Irons (6-7)',
    icon: '⚙️',
    ballPosition: 'center',
    cues: [
      'Ball position centre of stance',
      'Normal divot pattern — should start at or after the ball',
      'Hands ahead at impact — shaft lean forward',
      'Same tempo as your wedges — just a longer club'
    ],
    fault: 'Inconsistent distances',
    fix: 'If PW goes as far as 7-iron, you\'re thinning the 7. Work on the Half Swing Compression drill. Centre contact with proper shaft lean produces proper distance gaps.'
  },
  {
    id: 'short-iron',
    club: 'Short Irons (8-9)',
    icon: '🎯',
    ballPosition: 'center',
    cues: [
      'Ball centre of stance',
      'These are your scoring clubs — accuracy over distance',
      'Expect a divot after the ball position',
      'Let the loft do the work — don\'t scoop'
    ],
    fault: 'Flying too far (thin) or too short (fat)',
    fix: 'Controlled 85% swings. Don\'t help the ball up. Trust the club loft. Consistent weight transfer to front foot.'
  },
  {
    id: 'wedge',
    club: 'Wedges (PW/SW/LW)',
    icon: '🔨',
    ballPosition: 'center',
    cues: [
      'Ball centre or slightly back',
      'Weight 60% forward at address, stays forward',
      'Hands ahead at all times — compression, not scooping',
      'Control distance by backswing length, NOT swing speed'
    ],
    fault: 'Topped/thinned wedges that run along the ground',
    fix: 'You\'re hanging back and scooping (trying to help the ball up). Weight forward, hands forward, hit DOWN on it. The loft and backspin make it go up.'
  },
  {
    id: 'putter',
    club: 'Putter',
    icon: '🏑',
    ballPosition: 'forward',
    cues: [
      'Eyes directly over the ball',
      'Shoulders rock like a pendulum — no wrist action',
      'Pace is more important than line',
      'Read the putt from behind the ball AND behind the hole'
    ],
    fault: 'Poor distance control (3-putts)',
    fix: 'Practice the Putting Ladder drill. Focus on getting every putt within a 3-foot circle of the hole. Two-putt from anywhere = you\'re putting well.'
  }
];

// ── Pre-Shot Routine ───────────────────────────────────────
export const preShotRoutine = [
  { step: 1, text: 'Stand behind the ball — pick your target line and an intermediate target (a spot 2 feet ahead on the line)' },
  { step: 2, text: 'Take one practice swing with specific intent (feel the shot you want to hit)' },
  { step: 3, text: 'Step in and align the clubface to your intermediate target' },
  { step: 4, text: 'Set your feet parallel to the target line, one comfortable waggle' },
  { step: 5, text: 'Breathe out, clear your mind, and GO — no more than 5 seconds over the ball' }
];

// ── Course Management Tips ─────────────────────────────────
export const courseManagement = [
  {
    id: 'take-more-club',
    title: 'Take One More Club',
    icon: '📏',
    tip: 'Most amateurs miss short. Club up and make an easy swing. An easy 7-iron beats a hard 8-iron every time.',
    details: [
      '80% of amateur misses are short of the target',
      'An easy swing with more club is more accurate',
      'The ego club is always one too few',
      'Pin at the back? Consider two extra clubs'
    ]
  },
  {
    id: 'fat-part',
    title: 'Aim for the Fat Part of the Green',
    icon: '🟢',
    tip: 'Don\'t aim at pins near edges or behind bunkers. The centre of the green is almost always the smart play.',
    details: [
      'Pros miss greens 30% of the time — you\'ll miss more',
      'Centre of the green gives the biggest margin for error',
      'Two-putt from the middle beats a bunker shot',
      'Only go pin-hunting when the pin is centre-green with no trouble'
    ]
  },
  {
    id: 'play-your-miss',
    title: 'Play to Your Miss',
    icon: '↩️',
    tip: 'If you tend to slice, aim left of target. Don\'t fight your natural shot shape — use it.',
    details: [
      'If your miss is a slice, aim down the left side',
      'A managed fade is a useful shot — don\'t chase a draw yet',
      'If it goes straight, you\'re in the left side of the fairway (safe)',
      'If it fades, you\'re in the middle (perfect)',
      'Whatever you do: avoid aiming right when you slice'
    ]
  },
  {
    id: 'lay-up-smart',
    title: 'When to Lay Up',
    icon: '🧠',
    tip: 'If the chance of pulling off the hero shot is less than 50%, lay up. Bogey is better than double or triple.',
    details: [
      'Water in play? Lay up to your favourite approach distance',
      'Can you clear that bunker 9 times out of 10? If not, play short of it',
      'Lay up to a full wedge distance (80-100m), not an awkward half-shot',
      'A bogey and a birdie = even par. A triple alone is +3.'
    ]
  },
  {
    id: 'par-your-friend',
    title: 'Par Is Your Friend',
    icon: '⭐',
    tip: 'As a beginner, target bogey golf (score ~90). Every par feels like a birdie. Don\'t force birdies.',
    details: [
      'Target score: bogey on every hole = 90. That\'s a great round!',
      'Play for the safe, high-percentage shot',
      'Pars will happen naturally when you make good decisions',
      'Your biggest score savers: avoiding doubles and triples',
      'Course management beats swing speed at every handicap level'
    ]
  },
  {
    id: 'wind-play',
    title: 'Playing in Wind',
    icon: '💨',
    tip: '"When it\'s breezy, swing easy." More speed = more spin = more the wind affects the ball.',
    details: [
      'Into wind: club up 1-2, swing 75%, ball slightly back',
      'Downwind: club down 1, plan for extra roll',
      'Crosswind: aim into it and let it drift back',
      'Punch shots (low trajectory) are your friend in strong wind',
      'Tee the ball lower in a headwind to reduce spin'
    ]
  }
];

// ── Weekly Plan ────────────────────────────────────────────
export const weeklyPlan = [
  { day: 'Monday',    shortDay: 'Mon', focus: 'Driver / irons',     location: 'Home', minutes: 15, drills: ['gate-drill', 'pump-drill'] },
  { day: 'Tuesday',   shortDay: 'Tue', focus: 'Wedges / chipping',  location: 'Home', minutes: 15, drills: ['slow-impact', 'wedge-ladder'] },
  { day: 'Wednesday', shortDay: 'Wed', focus: 'Putting / short game',location: 'Home', minutes: 10, drills: ['putting-ladder'] },
  { day: 'Thursday',  shortDay: 'Thu', focus: 'Driver / irons',     location: 'Home', minutes: 15, drills: ['pump-drill', 'slow-impact'] },
  { day: 'Friday',    shortDay: 'Fri', focus: 'Tempo / rhythm',     location: 'Home', minutes: 10, drills: ['tempo-swings'] },
  { day: 'Saturday',  shortDay: 'Sat', focus: 'Full session',       location: 'Range', minutes: 30, drills: ['half-compression', 'pump-drill', 'driver-start-line', 'wedge-ladder'] },
  { day: 'Sunday',    shortDay: 'Sun', focus: 'Recovery / putting',  location: 'Home', minutes: 10, drills: ['putting-ladder'] }
];

// ── Driver Distance Goals ──────────────────────────────────
export const driverDistanceGoals = [
  { distance: '180m', title: 'Baseline', detail: 'Current carry distance — focus on centre contact', status: 'complete' },
  { distance: '200m', title: 'Next Jump', detail: 'Achievable with lag and better strike — no extra effort', status: 'active' },
  { distance: '220m', title: 'Stretch Target', detail: 'Requires consistent lag, high smash factor, and optimised launch', status: 'pending' }
];

// ── Gear ───────────────────────────────────────────────────
export const gear = [
  {
    id: 'alignment-sticks',
    name: 'Alignment Sticks',
    type: 'Essential',
    budget: '$20 – $40',
    summary: 'The most versatile training aid. Use for setup, path drills, gate drill, and target lines.',
    bullets: [
      'Check alignment of feet, hips, shoulders',
      'Create gates for swing path drills',
      'Lay on ground for target line reference',
      'Can substitute with two long sticks or dowels'
    ]
  },
  {
    id: 'impact-bag',
    name: 'Impact Bag',
    type: 'Essential',
    budget: '$25 – $50',
    summary: 'Builds correct impact position. Stops scooping and teaches hands-ahead compression.',
    bullets: [
      'Feel proper shaft lean at impact',
      'Train hands-ahead position',
      'Eliminates scooping and flipping',
      'Great for indoor practice — no ball needed'
    ]
  },
  {
    id: 'putting-mat',
    name: 'Putting Mat',
    type: 'Essential',
    budget: '$50 – $100',
    summary: 'Fastest way to lower scores. A good putting mat builds start line and pace control.',
    bullets: [
      'Practice start line accuracy daily',
      'Build pace control with ladder drills',
      'Return ball feature saves time',
      'Look for minimum 10-foot length'
    ]
  },
  {
    id: 'range-net',
    name: 'Practice Net + Mat',
    type: 'Essential',
    budget: '$200 – $400+',
    summary: 'Turns your backyard into a practice area. Hit real balls at home with full swings.',
    bullets: [
      'Get a cage-style net for safety with driver',
      'Quality hitting mat protects joints',
      'Pair with alignment sticks for complete setup',
      'Budget for a 6m × 10m zone minimum for safety'
    ]
  },
  {
    id: 'foam-balls',
    name: 'Foam / Plastic Practice Balls',
    type: 'Useful',
    budget: '$15 – $30',
    summary: 'Safe for chipping and short game practice in any outdoor space. Won\'t damage anything.',
    bullets: [
      'Great for chipping ladder drill',
      'Practice short game without a net',
      'Won\'t break windows or damage property',
      'Fly about 40% of real ball distance'
    ]
  },
  {
    id: 'swing-trainer',
    name: 'Weighted Swing Trainer',
    type: 'Useful',
    budget: '$80 – $100',
    summary: 'Builds tempo, balance, and proper sequencing. Great warm-up tool before rounds.',
    bullets: [
      'Forces smooth tempo (can\'t rush a heavy club)',
      'Builds golf-specific muscles',
      'Great for 5-minute warm-up before a round',
      'Helps with transition and lag feel'
    ]
  }
];

// ── Builder Sequences ──────────────────────────────────────
export const builderSequences = {
  home: {
    balanced:  ['slow-impact', 'gate-drill', 'pump-drill', 'putting-ladder', 'nine-to-three'],
    driver:    ['pump-drill', 'gate-drill', 'tempo-swings', 'feet-together-driver', 'slow-impact'],
    irons:     ['half-compression', 'slow-impact', 'nine-to-three', 'towel-strike', 'wedge-ladder'],
    shortGame: ['wedge-ladder', 'chipping-ladder', 'putting-ladder', 'slow-impact'],
    putting:   ['putting-ladder']
  },
  range: {
    balanced:  ['half-compression', 'pump-drill', 'driver-start-line', 'wedge-ladder', 'putting-ladder'],
    driver:    ['pump-drill', 'gate-drill', 'driver-start-line', 'tempo-swings', 'feet-together-driver'],
    irons:     ['half-compression', 'seven-iron-strike-ladder', 'nine-to-three', 'slow-impact', 'towel-strike'],
    shortGame: ['wedge-ladder', 'chipping-ladder', 'putting-ladder', 'slow-impact'],
    putting:   ['putting-ladder']
  }
};

// ── Focus & Location Labels ────────────────────────────────
export const focusLabels = {
  balanced:  'Balanced',
  driver:    'Driver / Reduce Slice',
  irons:     'Irons / Strike & Distance',
  shortGame: 'Wedges / Short Game',
  putting:   'Putting'
};

export const locationLabels = {
  home:  'Home',
  range: 'Driving Range'
};

// ── Tab Labels (for top bar subtitle) ──────────────────────
export const tabLabels = {
  course:   'Course Tips',
  practice: 'Practice Hub',
  drills:   'Drill Library',
  progress: 'Progress',
  gear:     'Gear & Setup'
};
