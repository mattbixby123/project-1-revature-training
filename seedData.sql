--- ===========================================================================
--- 1. USERS TABLE (180 Total)
--- VUs 1-30: Login/Logout
--- VUs 31-90: Task Management (Create/Edit)
--- VUs 91-140: Subtask Management (Create/Edit)
--- VUs 141-180: View Completed
--- ===========================================================================
INSERT INTO users (username, password) VALUES 
('username1', 'password1'), ('username2', 'password2'), ('username3', 'password3'), ('username4', 'password4'), ('username5', 'password5'),
('username6', 'password6'), ('username7', 'password7'), ('username8', 'password8'), ('username9', 'password9'), ('username10', 'password10'),
('username11', 'password11'), ('username12', 'password12'), ('username13', 'password13'), ('username14', 'password14'), ('username15', 'password15'),
('username16', 'password16'), ('username17', 'password17'), ('username18', 'password18'), ('username19', 'password19'), ('username20', 'password20'),
('username21', 'password21'), ('username22', 'password22'), ('username23', 'password23'), ('username24', 'password24'), ('username25', 'password25'),
('username26', 'password26'), ('username27', 'password27'), ('username28', 'password28'), ('username29', 'password29'), ('username30', 'password30'),
('username31', 'password31'), ('username32', 'password32'), ('username33', 'password33'), ('username34', 'password34'), ('username35', 'password35'),
('username36', 'password36'), ('username37', 'password37'), ('username38', 'password38'), ('username39', 'password39'), ('username40', 'password40'),
('username41', 'password41'), ('username42', 'password42'), ('username43', 'password43'), ('username44', 'password44'), ('username45', 'password45'),
('username46', 'password46'), ('username47', 'password47'), ('username48', 'password48'), ('username49', 'password49'), ('username50', 'password50'),
('username51', 'password51'), ('username52', 'password52'), ('username53', 'password53'), ('username54', 'password54'), ('username55', 'password55'),
('username56', 'password56'), ('username57', 'password57'), ('username58', 'password58'), ('username59', 'password59'), ('username60', 'password60'),
('username61', 'password61'), ('username62', 'password62'), ('username63', 'password63'), ('username64', 'password64'), ('username65', 'password65'),
('username66', 'password66'), ('username67', 'password67'), ('username68', 'password68'), ('username69', 'password69'), ('username70', 'password70'),
('username71', 'password71'), ('username72', 'password72'), ('username73', 'password73'), ('username74', 'password74'), ('username75', 'password75'),
('username76', 'password76'), ('username77', 'password77'), ('username78', 'password78'), ('username79', 'password79'), ('username80', 'password80'),
('username81', 'password81'), ('username82', 'password82'), ('username83', 'password83'), ('username84', 'password84'), ('username85', 'password85'),
('username86', 'password86'), ('username87', 'password87'), ('username88', 'password88'), ('username89', 'password89'), ('username90', 'password90'),
('username91', 'password91'), ('username92', 'password92'), ('username93', 'password93'), ('username94', 'password94'), ('username95', 'password95'),
('username96', 'password96'), ('username97', 'password97'), ('username98', 'password98'), ('username99', 'password99'), ('username100', 'password100'),
('username101', 'password101'), ('username102', 'password102'), ('username103', 'password103'), ('username104', 'password104'), ('username105', 'password105'),
('username106', 'password106'), ('username107', 'password107'), ('username108', 'password108'), ('username109', 'password109'), ('username110', 'password110'),
('username111', 'password111'), ('username112', 'password112'), ('username113', 'password113'), ('username114', 'password114'), ('username115', 'password115'),
('username116', 'password116'), ('username117', 'password117'), ('username118', 'password118'), ('username119', 'password119'), ('username120', 'password120'),
('username121', 'password121'), ('username122', 'password122'), ('username123', 'password123'), ('username124', 'password124'), ('username125', 'password125'),
('username126', 'password126'), ('username127', 'password127'), ('username128', 'password128'), ('username129', 'password129'), ('username130', 'password130'),
('username131', 'password131'), ('username132', 'password132'), ('username133', 'password133'), ('username134', 'password134'), ('username135', 'password135'),
('username136', 'password136'), ('username137', 'password137'), ('username138', 'password138'), ('username139', 'password139'), ('username140', 'password140'),
('username141', 'password141'), ('username142', 'password142'), ('username143', 'password143'), ('username144', 'password144'), ('username145', 'password145'),
('username146', 'password146'), ('username147', 'password147'), ('username148', 'password148'), ('username149', 'password149'), ('username150', 'password150'),
('username151', 'password151'), ('username152', 'password152'), ('username153', 'password153'), ('username154', 'password154'), ('username155', 'password155'),
('username156', 'password156'), ('username157', 'password157'), ('username158', 'password158'), ('username159', 'password159'), ('username160', 'password160'),
('username161', 'password161'), ('username162', 'password162'), ('username163', 'password163'), ('username164', 'password164'), ('username165', 'password165'),
('username166', 'password166'), ('username167', 'password167'), ('username168', 'password168'), ('username169', 'password169'), ('username170', 'password170'),
('username171', 'password171'), ('username172', 'password172'), ('username173', 'password173'), ('username174', 'password174'), ('username175', 'password175'),
('username176', 'password176'), ('username177', 'password177'), ('username178', 'password178'), ('username179', 'password179'), ('username180', 'password180');
--- ===========================================================================
--- 2. TODOS TABLE SEEDING
--- ===========================================================================

--- 2. SEED TODOS FOR EDITING (VUs 61-90)
-- These will become IDs 1 through 30
INSERT INTO todos (task, completed, username) VALUES
('Initial Task 61', false, 'username61'), ('Initial Task 62', false, 'username62'),
('Initial Task 63', false, 'username63'), ('Initial Task 64', false, 'username64'),
('Initial Task 65', false, 'username65'), ('Initial Task 66', false, 'username66'),
('Initial Task 67', false, 'username67'), ('Initial Task 68', false, 'username68'),
('Initial Task 69', false, 'username69'), ('Initial Task 70', false, 'username70'),
('Initial Task 71', false, 'username71'), ('Initial Task 72', false, 'username72'),
('Initial Task 73', false, 'username73'), ('Initial Task 74', false, 'username74'),
('Initial Task 75', false, 'username75'), ('Initial Task 76', false, 'username76'),
('Initial Task 77', false, 'username77'), ('Initial Task 78', false, 'username78'),
('Initial Task 79', false, 'username79'), ('Initial Task 80', false, 'username80'),
('Initial Task 81', false, 'username81'), ('Initial Task 82', false, 'username82'),
('Initial Task 83', false, 'username83'), ('Initial Task 84', false, 'username84'),
('Initial Task 85', false, 'username85'), ('Initial Task 86', false, 'username86'),
('Initial Task 87', false, 'username87'), ('Initial Task 88', false, 'username88'),
('Initial Task 89', false, 'username89'), ('Initial Task 90', false, 'username90');

--- 3. SEED TODOS FOR SUBTASK CREATION (VUs 91-115)
-- These will become IDs 31 through 55
INSERT INTO todos (task, completed, username) VALUES
('Parent Todo 91', false, 'username91'), ('Parent Todo 92', false, 'username92'),
('Parent Todo 93', false, 'username93'), ('Parent Todo 94', false, 'username94'),
('Parent Todo 95', false, 'username95'), ('Parent Todo 96', false, 'username96'),
('Parent Todo 97', false, 'username97'), ('Parent Todo 98', false, 'username98'),
('Parent Todo 99', false, 'username99'), ('Parent Todo 100', false, 'username100'),
('Parent Todo 101', false, 'username101'), ('Parent Todo 102', false, 'username102'),
('Parent Todo 103', false, 'username103'), ('Parent Todo 104', false, 'username104'),
('Parent Todo 105', false, 'username105'), ('Parent Todo 106', false, 'username106'),
('Parent Todo 107', false, 'username107'), ('Parent Todo 108', false, 'username108'),
('Parent Todo 109', false, 'username109'), ('Parent Todo 110', false, 'username110'),
('Parent Todo 111', false, 'username111'), ('Parent Todo 112', false, 'username112'),
('Parent Todo 113', false, 'username113'), ('Parent Todo 114', false, 'username114'),
('Parent Todo 115', false, 'username115');

--- 4. SEED TODOS FOR SUBTASK EDITING (VUs 116-140)
-- These will become IDs 56 through 80
INSERT INTO todos (task, completed, username) VALUES
('Parent for Sub-Edit 116', false, 'username116'), ('Parent for Sub-Edit 117', false, 'username117'),
('Parent for Sub-Edit 118', false, 'username118'), ('Parent for Sub-Edit 119', false, 'username119'),
('Parent for Sub-Edit 120', false, 'username120'), ('Parent for Sub-Edit 121', false, 'username121'),
('Parent for Sub-Edit 122', false, 'username122'), ('Parent for Sub-Edit 123', false, 'username123'),
('Parent for Sub-Edit 124', false, 'username124'), ('Parent for Sub-Edit 125', false, 'username125'),
('Parent for Sub-Edit 126', false, 'username126'), ('Parent for Sub-Edit 127', false, 'username127'),
('Parent for Sub-Edit 128', false, 'username128'), ('Parent for Sub-Edit 129', false, 'username129'),
('Parent for Sub-Edit 130', false, 'username130'), ('Parent for Sub-Edit 131', false, 'username131'),
('Parent for Sub-Edit 132', false, 'username132'), ('Parent for Sub-Edit 133', false, 'username133'),
('Parent for Sub-Edit 134', false, 'username134'), ('Parent for Sub-Edit 135', false, 'username135'),
('Parent for Sub-Edit 136', false, 'username136'), ('Parent for Sub-Edit 137', false, 'username137'),
('Parent for Sub-Edit 138', false, 'username138'), ('Parent for Sub-Edit 139', false, 'username139'),
('Parent for Sub-Edit 140', false, 'username140');

--- 5. SEED SUBTASKS (For VUs 116-140 to edit)
-- These will become subtask IDs 1 through 25
-- They link to the todos with task name 'Parent for Sub-Edit...'
INSERT INTO subtasks (task, completed, todo_id)
SELECT 'Initial Subtask', false, id 
FROM todos 
WHERE task LIKE 'Parent for Sub-Edit%';

--- 6. SEED COMPLETED TASKS (VUs 141-180)
-- These will become IDs 81 through 120
INSERT INTO todos (task, completed, username)
SELECT 'Archived Task', true, username 
FROM users 
WHERE username BETWEEN 'username141' AND 'username180';