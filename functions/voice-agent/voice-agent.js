/**
 * Cloudflare Worker for Voice Agent API Proxy
 * 
 * SETUP INSTRUCTIONS:
 * 1. Go to https://workers.cloudflare.com
 * 2. Sign up for free account
 * 3. Click "Create a Service" or "Create a Worker"
 * 4. Copy this entire file and paste it into the worker editor
 * 5. Replace 'YOUR_API_KEY_HERE' below with your actual Google AI API key
 * 6. Update the context content below with your information
 * 7. Click "Save and Deploy"
 * 8. Copy your worker URL (e.g., https://voice-proxy.your-subdomain.workers.dev)
 * 9. Update config.js with your worker URL
 */

// Your Google AI Studio API Key (stored securely in Cloudflare)
const GOOGLE_AI_API_KEY = 'YOUR_API_KEY_HERE';

// Model configuration
// Using Gemini 2.5 Flash Live - official Live API model with native audio
// model: 'gemini-live-2.5-flash-preview',
// model: 'gemini-live-2.5-flash-preview-native-audio-09-2025',  // cost-efficient version for real-time voice agents
const MODEL_NAME = 'gemini-2.5-flash-native-audio-preview-12-2025';
// model: 'gemini-live-2.5-flash-native-audio',  // recommended for low-latency voice agents

// Greeting message (in German to trigger German greeting)
const GREETING_MESSAGE = 'Bitte grüße mich kurz und nenne mir, wie ich dir helfen kann.';

// English Context - Replace with your actual content
const CONTEXT_EN = `## About Walter

25 years of experience in programming with a focus on PHP based web applications since about 10 years, as well as design of databases and plain SQL development. Experience in "AI first" development. Interested in minimalistic solutions and innovative technologies.

- **Persoanl interests:** Technology Trends / Emerging Technologies / Futurism, AI
- **Languages:** German, English
- **Work location:** Bamberg, Germany or home office


## Career goals

- Development with AI and cool AI features
- Ideally working on topic of interest, e.g. nutrition, information management, innovation
- alternatively DB design and plain SQL development
- Part-time 16-20h (Home Office) (mention that full time is possible temporarily)
- Maintain work-life balance with flexible hours
- No pure documentation or test jobs

### Roles

- AI Engineer
- AI first developer
- Data Engineer
- NLP Engineer
- Generative AI Engineer
- AI Product Engineer / AI Full-Stack

- Full-Stack / AI-Product Engineering with PHP + KI-API-Integration
- Backend / Data-Infrastructure with AI-automation
- Web-Apps with AI-features (e.g. recommendation systems, text analysis, data workflows)


## Current skills

### AI & ML (these are new skills: know how availaible, still learning more)

- Project types
  - AI agents
  - AI features for you existing apps and websites
  - AI-powered workflow automation: agents that handle routine tasks
  - Smart data solutions and web search
- Languages
  - Python

### Web development

- Project types
  - Larger web applications based on PHP and JavaScript with a focus on usability
  - Websites: Modern, responsive websites that look great on all devices and are optimized for AI and search engines.
  - Mini Apps: Small to medium-sized applications that solve specific problems - with AI fast and cost-efficient.
- Skills
  - OOAD: Object oriented analysis and design
- Languages
  - PHP
  - JavaScript
  - HTML
  - CSS
  - YAML
  - JSON

### Database

- Project types
  - Database design with a focus on exact business process modelling
  - SQL development: Complex SQL queries and procedures
- Databases
  - MySQL, MariaDB
  - Oracle
  - SQL Server

### Misc services

- Consulting: Advice on technology choices, architecture, and implementation strategies for your projects

### Special skills

- AI superpowers: Increased productivity through AI usage. Passionate about making minimalistic apps. Minimalistic approaches (less frameworks and tools) increase the productivity even more in combination with AI.
- Conceptualization of software for management and workflow tasks

### Tools

- Windsurf IDE
- Claude Sonnet
- Various AI tools and frameworks


## Projects

### Last projects

#### Further Development of Web Application for Statistics

Period: 2020-01 - 2024-07

- **Company:** VX Apps
- **Role:** Development
- **Details:** Further development of a web application in the area of statistical data.
- **Platform:** Web
- **Tools:** PHP 7, HTML5, Bootstrap, AdminLTE, Chart.js, CSS 3, JavaScript, jQuery, YAML, JSON

#### New Development of a Web Application for Operational Administration

Period: 2019-05 - 2021-01

- **Company:** Advertising agency
- **Role:** Development
- **Details:** Database-driven application for handling operational processes, replacing a legacy system. Focus on minimizing dependencies to ensure a very long lifetime of the application and to reduce migration efforts caused by frameworks. Generation of user interfaces from building blocks and misc components for a small framework including an ORM. Design of the database and forms based on this framework.
- **Platform:** Web
- **Tools:** Custom framework, PHP 7, JavaScript, jQuery, YAML, JSON, Bootstrap, CSS, MariaDB, SQL

#### Development of Open Source Applications and Components

Period: since 2018-01

- **Company:** Own projects
- **Role:** Development
- **Details:** Development of open-source components and applications (GitHub). See http://www.github.com/walter-a-jablonowski. In these private projects, the focus is on simplicity in contrast to the general trend toward increasingly complex web frameworks, as well as on automation. Often you can achieve the same results with significantly less complex means. General areas of interest: information management, tools for data acquisition and communication, framework components, tools.
- **Platform:** Web (Chrome)
- **Tools:** PHP 7, JavaScript, jQuery, YAML, JSON, Bootstrap, HTML, CSS

#### New Development of Web Application for Statistics

Period: 2016-02 - 2017-12

- **Company:** Varimetrix (Germany) GmbH
- **Role:** Development
- **Details:** New development of a web application in the area of statistical data. Layout based on Bootstrap and AdminLTE, implementation of the visual design, animated menus, etc. Custom classes for the app (base classes, app, error handler, DB, log, data, captions, etc.) as well as client-server communication. Custom templating system. Dashboard with various charts based on data collected via SDK and Chart.js, rearrangeable widgets. Creation of user-defined charts with a YAML chart definition format. Data lists with grouping, expandable rows, sorting, (i) buttons with additional popup information. Detail view with data list, list functions, menus. Mobile view for phone and tablet with responsive design adjustments. User settings, admin area, user help, about, imprint, privacy, and other features.
- **Platform:** Linux server, Apache, MySQL 5.7, PC, Mac, smartphone, tablet (Chrome)
- **Tools:** PHP 5/7, HTML5, Bootstrap, AdminLTE, Chart.js, CSS 3, JavaScript, jQuery, YAML, JSON


## Older projects

All projects below are projects that I did before 2015 on different platforms. Currently I can't offer all of these languages/technologies cause that was too long ago. IMPORTANT: Whenever the user asks for languages or technologies that I used in old projects and that I don't have in my current skill set, tell him about my experience but also mention that I currently can't offer these cause this was too long ago.

#### Extension of an iOS application, iPad version, porting to Android

Period: 2015-11 - 2016-01

- **Company:** Varimetrix (Deutschland) GmbH
- **Role:** Development
- **Details:** Extension of an iOS application from the publishing sector with filter functions and various UI features. Migration of data from files to SQLite using a self-written tool. Complete rewrite of the data core. iPad version. Porting to Android.
- **Platform:** iOS, Android
- **Tools:** Objective C, Java, PHP, Xcode, Android Studio

#### Extension of an iOS application

Period: 2015-09 - 2015-10

- **Company:** Varimetrix (Deutschland) GmbH
- **Role:** Development
- **Details:** Extension of an iOS application with UI features, barcode scanner migration from a third‑party library to the iOS SDK, library updates, etc.
- **Platform:** iOS
- **Tools:** Objective C, Xcode

#### Work on an eCommerce system

Period: 2015-02 - 2015-03

- **Client:** Retail entrepreneur
- **Role:** Development
- **Details:** Contributed to an eCommerce system
- **Platform:** Web
- **Tools:** PHP

#### Development with .NET Gadgeteer

Period: from 2012-08

- **Company:** Own company
- **Role:** Analysis, design, development
- **Details:** Development with .NET Gadgeteer
- **Platform:** Windows, .NET Micro Framework
- **Tools:** C#, Visual Studio 2010, .NET Framework, .NET Micro Framework (NET MF), .NET Gadgeteer hardware

#### Contribution to an iPhone app for a Web 2.0 platform

Period: 2012-02

- **Client:** Software company
- **Role:** Development
- **Details:** Contribution to an iPhone app - iPhone version of a Web 2.0 platform.
- **Platform:** iOS
- **Tools:** iOS SDK 5, Objective C, Xcode

#### Development of a Web 2.0 web application

Period: 2011-07 - 2011-09

- **Company:** Own company
- **Role:** Planning, analysis, architecture, development
- **Details:** Development of a Web 2.0 application in the area of feed aggregation. Backend with database and backend functions. Web frontend.
- **Platform:** Web server, Linux
- **Tools:** PHP4, HTML, CSS, XML, JavaScript, jQuery

#### Development of an iPhone app for automobiles, training of developers

Period: 2010-12

- **Client:** Subcontractor of an automotive group
- **Role:** Analysis, design, development
- **Details:** Development of an iPhone app in the field of vehicle information as a basis for further app developments. Functional details of the project are confidential. Training of developers using the app.
- **Platform:** iOS
- **Tools:** iOS SDK 4, Objective C, Xcode, IB, web services, XML

#### Development of an iPhone app in the area of consumer services

Period: 2010-10 - 2010-12

- **Client:** Service provider
- **Role:** Analysis, design, development
- **Details:** Participation in the development of a service platform as an iPhone app in the area of consumer services.
- **Platform:** iOS
- **Tools:** iOS SDK 4, Objective C, Xcode, IB, web requests, XML

#### Development of a news iPhone app

Period: 2010-07 - 2010-08

- **Client:** Advertising agency
- **Role:** Analysis, design, development
- **Details:** Development of an iPhone app for communication of news items in the B2B sector. Display of news as list, detail view, PDF view, as well as push messages, user login, and access log in database. Development of the iPhone app and of a server interface that makes existing data (news, PDFs) available for use in the app.
- **Platform:** iOS, Linux server
- **Tools:** iOS SDK 4, Objective C, Xcode, Interface Builder, PHP4, SQL, MySQL, SOAP, push

#### Development of an iPhone app for a telecommunications group

Period: 2010-07 - 2010-08

- **Client:** Corporate subcontractor, end client: telecommunications group
- **Role:** Program design, development
- **Details:** Development of an iPhone app for a large German telecommunications group in the area of fee/payment processing.
- **Platform:** iOS
- **Tools:** Apple iPhone SDK 3 (at client’s request), Objective C, Xcode, Interface Builder

#### New development of an iPhone app for a real estate portal

Period: 2009-11

- **Client:** Web agency, end client: real estate portal
- **Role:** Analysis, design, development
- **Details:** Development of an app as a starter for the platform of a real estate portal. Retrieval of location information (GPS), search and display of properties from the DB via search text/location or geo-coordinates, plus user login.
- **Platform:** iOS
- **Tools:** iOS SDK 3, Objective C, Xcode, Interface Builder, GPS API

#### Database development SQL Server

Period: 2009-02 - 2009-12

- **Client:** Siemens IT-Solutions / Federal Employment Agency
- **Role:** Database developer
- **Details:** SQL development in a large database system used nationwide to manage the entire inventory of the Federal Employment Agency. Implementation of RfCs (Requests for Change), development of reports, complex mass data modifications.
- **Platform:** Windows XP, Windows 2003 Server, Unix
- **Tools:** MS SQL Server 2000 and 2008, SQL, SQL Server tools, reporting, DTS, Crystal Reports, Visual Studio and MS.NET for code generation

#### iPhone radio apps

Period: 2009-01 - 2009-03

- **Client:** Software company
- **Role:** Development
- **Details:** Contribution to several iPhone apps for receiving radio programs on the iPhone.
- **Platform:** iOS
- **Tools:** iOS SDK 3, Objective C, Xcode, Interface Builder

#### Tool for time tracking, project monitoring and billing in software projects

Period: 2008-07

- **Client:** Software company
- **Role:** Analysis, design, development
- **Details:** Main purpose: controlling budget compliance in software projects. Development of an Access-based multi-user solution for recording working times per project or task, with evaluations to monitor adherence to times and budgets, as well as functions for billing customers and employees. Also order management, task overview per user with the option to assign tasks to users. Integrated requirements specification for each project. User management with different access rights depending on user role (developer, management).
- **Platform:** Windows XP
- **Tools:** MS Access 2003, VBA, SQL

#### Development of a bug reporting component with connection to a bug tracking system

Period: 2008-03

- **Client:** Software company
- **Role:** Development
- **Details:** Development of a problem report component for an application in the field of technical documentation. Integration with a bug tracking system.
- **Platform:** Windows XP
- **Tools:** C#, Visual Studio 2008, .NET Framework 3.0, WPF, web services

#### New development of an ERP system

Period: 2007-12 - 2008-03

- **Client:** Software company
- **Role:** Analysis, design, development
- **Details:** Development of an ERP/invoicing system for KMUs, including: customer master, supplier master, items, prices per supplier, orders, purchases, complete document history per transaction, UI optimized for ease of use, search and filter functions, printing functions. (Approx. 60% implemented. Completion was postponed by the client to the end of 2008.) Design of the relational database, SQL development, UI design, development of the client application.
- **Platform:** Windows XP
- **Tools:** Visual Basic.NET, Visual Studio, MS .NET Framework, WinForms, ADO.NET, Xceed Controls, SQL, MS Access

#### New development of an application for data cleansing

Period: 2007-11, 2008-07 - 2008-08

- **Client:** Subcontractor, end client: automotive supplier group
- **Role:** Analysis, design, development
- **Details:** Development of software for flexible checking and cleansing of large Oracle databases with several million records (statistical data from industrial production). Later: Consulting activities for integrating the tool into a larger application. Implementation of additional components.
- **Platform:** Windows XP
- **Tools:** Visual Basic.NET, Visual Studio, MS .NET Framework, WinForms, Oracle database, PL/SQL, Oracle SQL Developer, MS Access, Q-DAS

#### Component for creating hierarchical data filters

Period: 2008-04 - 2008-05

- **Client:** Subcontractor, end client: automotive supplier group
- **Role:** Analysis, design, development
- **Details:** Development of a reusable component (DLL) for creating hierarchical, user-defined (unlimited-depth) data filters in VB.NET applications. XML format for filter definitions. The component is intended for use in multiple applications.
- **Platform:** Windows XP
- **Tools:** Visual Basic.NET, Visual Studio, MS .NET Framework, WinForms, Oracle database, PL/SQL, Oracle SQL Developer, XML

#### New development of an application for IT support

Period: 2007-07 - 2008-12

- **Client:** Subcontractor, end client: automotive supplier group
- **Role:** Analysis, design, development
- **Details:** New development of an application for in-plant IT support, including: ticket system, case history per ticket (complete history), ticket workflow taking subcontractors into account, email dispatch from the application, knowledge base, evaluation reports, extensive graphical evaluations (bar charts, pie charts incl. hierarchical data filters), printing functions for all data, access rights management, and more. Development of the entire application: design of the relational database, development of queries and procedures with PL/SQL, development of the complete client application, further development based on requirements. In 08/08 another department became interested in the program: development of a modified version of the application.
- **Platform:** Windows XP
- **Tools:** Visual Basic.NET, Visual Studio, MS .NET Framework, WinForms, ADO.NET, Xceed Controls, Oracle database, PL/SQL, Oracle SQL Developer

#### New development of a plant-wide application for “user/access control”

Period: 2007-02 - 2008-12

- **Client:** Subcontractor, end client: automotive supplier group
- **Role:** Analysis, design, development
- **Details:** New development of an application for centralized management, validation, and provision of data, user accounts, and access rights for in-house applications. Extensive data import functions to provide data from five source systems. Implementation of the connection of third-party applications to the system for centralized program access. In the final stage, up to 70 applications and many more installations are to be connected. Implementation of overviews and evaluations of all account data for management purposes. Development of the entire application: design of the relational database, development of queries and procedures with PL/SQL, development of the complete client application, further development based on requirements.
- **Platform:** Windows XP
- **Tools:** Visual Basic.NET, C#, Visual Studio, MS .NET Framework, WinForms, ADO.NET, Xceed Controls, Oracle database, PL/SQL, Oracle SQL Developer, XML

#### Extension of an application for worldwide file exchange

Period: 2007-01

- **Client:** Subcontractor, end client: automotive supplier group
- **Role:** Development
- **Details:** Extension of an application for automated worldwide updating/distribution of files by several functions (in user clients, Windows service).
- **Platform:** Windows XP
- **Tools:** Visual Basic.NET, Visual Studio, MS .NET Framework, SQL, SQL database (SQLite), Sparx EA UML Tool

#### New development of an ERP application for solid wood furniture distribution

Period: 2004-12 - 2006-02

- **Company:** Own development in cooperation with a furniture importer
- **Role:** Planning, analysis, design, development
- **Details:** Development of a complete ERP system for handling the trade of solid wood furniture and sales via the internet. Automation of sales via the (self-developed) webshop and the eBay platform.
- **Platform:** Windows XP, SuSE Linux server (web server)
- **Tools:** MS Access XP, MySQL, PHP4, Visual Studio, C#

#### Preparation for the rework of approx. 10 Access applications

Period: 2004-11 - 2004-12

- **Client:** Software company, end client: DATEV e.G.
- **Role:** Analysis, design, development
- **Details:** Preparations for the revision of approx. 10 Access applications after migration to SP2 of Windows XP: requirements analysis, implementation of automated program conversion.
- **Platform:** Windows XP
- **Tools:** MS Access XP, Visual Studio

#### Technical proposal for redesign of a client/server application

Period: 2004-10

- **Client:** EDS Schweinfurt, Solution Center, end client: SKF (2 international locations)
- **Role:** Analysis
- **Details:** Pre-study for the redesign of a project controlling system. Analysis of the existing system with 140 users at two locations. Preparation of a technical study with several redesign strategies. Time and cost estimation.
- **Platform:** Windows NT, Unix
- **Tools:** Sybase database and PowerBuilder for testing purposes

#### Development of a web platform for print solutions

Period: 2004-07 - 2004-10

- **Company:** Own company
- **Role:** Development
- **Details:** Development of a web platform for print solutions (product development). Project was not pursued further after 10/04.
- **Platform:** Windows, Linux server
- **Tools:** PHP5, SQL, MySQL, HTML, XAMPP

#### MS Office training for self-employed course participants

Period: 2004-05 - 2005-06

- Institute 2F Informatik GmbH, Innsbruck
- Freelance MS Office trainer, training for entrepreneurs

#### Participation in the new development of an application framework

Period: 2002-01 - 2002-11

- **Company:** System house / industry software for the concrete industry
- **Role:** Development
- **Team:** 3 employees
- **Details:** Participation in the implementation of an application framework for commercial/technical applications. Function: generation of the relational database, GUI/configurable UI logic at runtime (based on a UML model in XML form).
- **Platform:** Windows 2000/Cygwin, Linux
- **Tools:** Java, XML, XSLT, Together UML, JBuilder

#### New development of software for production control in concrete plants

Period: 2001-02 - 2002-06

- **Company:** System house / industry software for the concrete industry, end clients: Saint Gobain group, 2 concrete plants in Germany
- **Role:** Project management/development
- **Team:** 3-4 employees
- **Details:** New development of software for production in concrete plants: production control, order processing, collection of production data, generation of statistical evaluations, connection to invoicing systems. Also on-site installations with customer-specific customization of the software: various installation projects at plants in Germany and northern France; development of extensions as required, adaptation of formats to the plant equipment and to commercial software.
- **Tasks:** Project management, customer consulting, analysis and design, GUI workflow/implementation of core functionality, coordination with a manufacturer of control systems
- **Platform:** Windows NT/2000
- **Tools:** MS Access, Visual Basic, Winsock, SQL Server

#### Migration of a scheduling/dispatching software

Period: 2001-01 - 2001-02

- **Client:** System house / industry software for the concrete industry
- **Role:** Analysis, development
- **Details:** Migration of a very extensive fleet dispatching software from Borland C++ to Visual C++ and Win32.
- **Platform:** Windows 2000
- **Tools:** Borland C++, Visual C++, Visual Basic (for code generation of resource files)

#### Euro conversion of an invoicing application

Period: 2001-10 - 2001-12

- **Company:** System house / industry software for the concrete industry
- **Role:** Analysis, design, development
- **Details:** Development of a tool for Euro conversion of approx. 300 installations (as of 10/01). Subsequently, gradual execution of the conversion for all customers.
- **Platform:** Windows (customer’s version)
- **Tools:** MS Visual C

#### Further development of 3 software products

Period: 2000-09 - 2003-01

- **Company:** System house / industry software for the concrete industry
- **Role:** Analysis, design, development
- **Details:** Development tasks in 3 products (invoicing, financial accounting, and fleet dispatching)  
  - Development of functional enhancements based on requirements  
  - Creation/adjustment of forms (Forth-like language)  
  - Creation/adjustment of import/export interfaces (production systems, financial accounting, etc.)
- **Platform:** Windows 95/98/NT/2000/XP
- **Tools:** C, Visual C++, Borland C++, MFC, dBase IV/V (proprietary DB API), Forth-like language

#### Working in a company already during school

Period: 1996-01 - 1999-09

- **Company:** System house
- **Role:** Development
- **Details:** Various projects as part of a part-time job during school: further development of financial accounting, various tools.
- **Platform:** Windows NT
- **Tools:** MS Access, Visual Basic, C, Visual C++, MFC`;

// German Context - Replace with your actual content
const CONTEXT_DE = `HINWEIS: Sprich natürlich mit vollständigen Worten wie "mit", "im", "am", "zu", "bei".

## Über Walter

25 Jahre Erfahrung in der Programmierung zuletzt mit Fokus auf PHP-basierten Webanwendungen seit ca. 10 Jahren, sowie Design von Datenbanken und reine SQL-Entwicklung. Erfahrung in "AI first"-Entwicklung. Interessiert an minimalistischen Lösungen und innovativen Technologien.

- **Persönliche Interessen:** Technology Trends / Emerging Technologies / Futurism, AI
- **Sprachen:** Deutsch, Englisch
- **Arbeitsort:** Bamberg, Germany oder Home Office


## Karriereziele

- KI-basierte Entwicklung und coole KI-Features
- Idealerweise Themen von Interesse, z.B. Ernährung, Informationsmanagement, Innovationen
- alternativ DB-Design und reine SQL-Entwicklung
- Teilzeit 16-20h (Home Office) (erwähne, dass Vollzeit temporär denkbar ist)
- Work-Life-Balance durch flexible Arbeitszeiten
- Keine reinen Dokumentationsaufgaben oder nur Tests

### Rollen

- AI Engineer
- AI first developer
- Data Engineer
- NLP Engineer
- Generative AI Engineer
- AI Product Engineer / AI Full-Stack

- Full-Stack / AI-Product Engineering mit PHP + KI-API-Integration
- Backend / Data-Infrastructure mit KI-Automatisierung
- Web-Apps mit KI-Features (z. B. Empfehlungssystem, Textanalyse, Daten-Workflows)


## Aktuelle Fähigkeiten

### AI & ML (neue Fähigkeiten: Know How vorhanden, wird derzeit weiter ausgebaut)

- Projektarten
  - AI agents
  - AI features für Ihre existierenden Apps und Websiten
  - AI-powered workflow automation: Agenten die Routineaufgaben übernehmen
  - Smart data solutions und Websuche
- Programmiersprachen
  - Python

### Web development

- Projektarten
  - Größere Webanwendungen auf Basis von PHP und JavaScript mit Fokus auf Usability
  - Websites: Moderne, responsive Websites, die auf allen Geräten gut aussehen und für KI und Suchmaschinen optimiert sind
  - Mini-Apps: Kleine bis mittelgroße Anwendungen, die konkrete Probleme lösen - mit KI schnell und kosteneffizient umgesetzt
- Skills
  - OOAD: Object oriented analysis and design
- Programmiersprachen
  - PHP
  - JavaScript
  - HTML
  - CSS
  - YAML
  - JSON

### Datenbankentwicklung

- Projektarten
  - Datenbankdesign mit Fokus auf exakter Abbildung von Geschäftsprozessen
  - SQL-Entwicklung: Komplexe SQL-Abfragen und Prozeduren
- Datenbanken
  - MySQL, MariaDB
  - Oracle
  - SQL Server

### Diverse Dienste

- Consulting: Beratung zu Technologieauswahl, Architektur und Implementierungsstrategien für Ihre Projekte

### Spezielle Fähigkeiten

- Gesteigerte Produktivität durch KI-Einsatz bei der Entwicklung. Zudem Effizienzsteigerung durch minimalistische Ansätze: Weniger Frameworks und Tools steigern die Produktivität erheblich in Kombination mit KI.
- Konzipierung von Software für Management/Workflow-Aufgaben

### Tools

- Windsurf IDE
- Claude Sonnet
- Unterschiedliche KI-Tools und Frameworks


## Projekte

### Letzte Projekte

#### Weiterentwicklung Web Applikation Statistik

Zeitraum: 2020-01 - 2024-07

- **Unternehmen:** VX Apps
- **Rolle:** Entwicklung
- **Details:** Weiterentwicklung einer Web Applikation im Bereich Statistik-Daten.
- **Plattform:** Web
- **Werkzeuge:** PHP 7, HTML5, Bootstrap, AdminLTE, Chartjs, CSS 3, javascript, jquery, YAML, JSON

#### Neuentwicklung einer Webapplikation für betriebliche Verwaltung

Zeitraum: 2019-05 - 2021-01

- **Unternehmen:** Werbeagentur
- **Rolle:** Entwicklung
- **Details:** Datenbank basierte Applikation zur Abwicklung betrieblicher Vorgänge. Ablösen eines Altsystems. Insbesondere möglichst abhängigkeitslose Entwicklung um eine sehr lange Laufzeit der Anwendung zu gewährleisten und Migrationsaufwände durch Frameworks zu minimieren. Genereren von Oberflächen aus Bausteinen, sonstige Komponenten für ein kleines Framework inklusive ORM. Entwickeln von Datenbank und Formularen auf Basis des Frameworks.
- **Plattform:** Web
- **Werkzeuge:** Framework: Selbst entwickelt, PHP 7, javascript, jquery, YAML, JSON, Bootstrap, CSS, MariaDB, SQL

#### Entwicklung von Open Source Applikationen und Komponenten

Zeitraum: seit 2018-01

- **Unternehmen:** Eigenentwicklungen
- **Rolle:** Entwicklung
- **Details:** Entwicklung von Open Source Komponenten und Applikationen (github). Siehe http://www.github.com/walter-a-jablonowski. Bei diesen privaten Projekten liegt der Fokus auf Einfachheit im Gegensatz zum allgemeinen Trend immer komplexer werdender Webframeworks, sowie Automatisierung. Sieht man genau hin, dann kann man das selbe Ergebnis häufig auch mit deutlich weniger komplexen Mitteln erreichen. Interessenbereiche allgemein: Informationsmanagement, Tools für Datengewinnung und Kommunikation, Framework-Komponenten, Tools
- **Plattform:** Web (Chrome)
- **Werkzeuge:** PHP 7, javascript, jquery, YAML, JSON, Bootstrap, HTML, CSS

#### Neuentwicklung Web Applikation Statistik

Zeitraum: 2016-02 - 2017-12

- **Unternehmen:** Varimetrix (Deutschland) GmbH
- **Rolle:** Entwicklung
- **Details:** Neuentwicklung einer Web Applikation im Bereich Statistik-Daten. Layout auf Basis von Bootstrap und AdminLTE, Umsetzung grafisches Design, animierte Menüs u.Ä. Eigene Classes für die App (Base classes, App, ErrorHandler, DB, Log, Data, Captions usw.), sowie Client-Server-Kommunikation. Eigenes Templating System. Dashboard, verschiedene Charts auf Basis von per SDK gesammelten Daten und Chartjs, neu anordnen von Widgets. Generieren benutzerdefinierter Charts, YAML Chart-Definitionsfomrat. Datenlisten mit Gruppierung, aufklappbar, Sortierung, (i) Buttons mit zusätzlichen Popup Informationen. Detailansicht mit Datenliste, Listenfunktionen, Menüs. Mobile Ansicht Handy, Tablet mit Design Anpassungen (responsive). User Settings, Admin, User Help, About, Impressum, Privacy. Und andere Funktionen...
- **Plattform:** Linux Server, Apache, MySQL 5.7, PC, Mac, Smartphone, Tablet (Chrome)
- **Werkzeuge:** PHP 5/7, HTML5, Bootstrap, AdminLTE, Chartjs, CSS 3, javascript, jquery, YAML, JSON


## Ältere Projekte

Alle nachfolgenden Projekte sind Arbeiten, die ich vor 2015 auf verschiedenen Plattformen durchgeführt habe. Momentan kann ich nicht alle diese Sprachen/Technologien aktiv anbieten, da dies zu lange zurückliegt. WICHTIG: Wenn ein Nutzer nach Sprachen oder Technologien fragt, die ich in älteren Projekten verwendet habe und die nicht mehr zu meinem aktuellen Skill-Set gehören, erläutere meine damalige Erfahrung, weise aber immer darauf hin, dass ich diese aktuell nicht mehr aktiv anbiete.

#### Erweiterung einer iOS Anwendung, iPad Version, Portierung auf Android

Zeitraum: 2015-11 - 2016-01

- **Unternehmen:** Varimetrix (Deutschland) GmbH
- **Rolle:** Entwicklung
- **Details:** Erweiterung einer iOS Anwendung aus dem Verlagsbereich um Filterfunktionen, verschiedene UI-Funktionen. Migration der Daten von Files auf SQLite per selbstgeschriebenem Tool. Neu Schreiben des Datenkern. iPad Version. Portierung auf Android.
- **Plattform:** iOS, Android
- **Werkzeuge:** Objective C, Java, PHP, xcode, Android Studio

#### Erweiterung einer iOS Anwendung

Zeitraum: 2015-09 - 2015-10

- **Unternehmen:** Varimetrix (Deutschland) GmbH
- **Rolle:** Entwicklung
- **Details:** Erweiterung einer iOS Anwendung um UI-Funktionen, Barcode Scanner Umstellung von Library auf iOS SDK, Libraries updaten, usw.
- **Plattform:** iOS
- **Werkzeuge:** **Objective C**, xcode

#### Mitarbeit an eCommerce System

Zeitraum: 2015-02 - 2015-03

- **Kunde:** Handelsunternehmer
- **Rolle:** Entwicklung
- **Details:** Mitarbeit an eCommerce-System
- **Plattform:** Web
- **Werkzeuge:** **PHP**

#### Entwicklung mit .NET Gadgeteer

Zeitraum: ab 2012-08

- **Unternehmen:** Eigenes Unternehmen
- **Rolle:** Analyse, Design, Entwicklung
- **Details:** Entwicklung mit .NET Gadgeteer
- **Plattform:** Windows, NET M
- **Werkzeuge:** **C#**, Visual Studio 2010, .NET Framework, .NET Micro Framework (NET MF), .NET Gadgeteer Hardware

#### Mitarbeit an einer iPhone App Web 2.0 Plattform

Zeitraum: 2012-02

- **Kunde:** Softwarehaus
- **Rolle:** Entwicklung
- **Details:** Mitarbeit an einer iPhone App - iPhone Version einer Web 2.0 Plattform.
- **Plattform:** iOS
- **Werkzeuge:** **iOS SDK 5**, Objective C, xcode

#### Entwicklung einer Web 2.0 Webapplikation

Zeitraum: 2011-07 - 2011-09

- **Unternehmen:** Eigenes Unternehmen
- **Rolle:** Planung, Analyse, Architektur, Entwicklung
- **Details:** Entwicklung einer Web 2.0 Applikation im Bereich Feed Aggregation. Backend mit Datenbasis und Backend Funktionen. Web Frontend.
- **Plattform:** Webserver, Linux
- **Werkzeuge:** **PHP4, HTML, CSS, XML, javascript, jquery**

#### Entwicklung einer iPhone App Automobile, Schulung von Programmierern

Zeitraum: 2010-12

- **Kunde:** **Subunternehmer Automobil Konzern**
- **Rolle:** Analyse, Design, Entwicklung
- **Details:** Entwicklung einer iPhone App im Bereich Fahrzeuginformationen als Basis für weitere App-Entwicklungen. Funktionaler Details des Projekts sind geheim. Schulung von Programmierern anhand der App.
- **Plattform:** iOS
- **Werkzeuge:** **iOS SDK 4, Objective C, xcode, IB, WebServices, XML**

#### Entwicklung einer iPhone App im Bereich Consumer Services

Zeitraum: 2010-10 - 2010-12

- **Kunde:** Dienstleister
- **Rolle:** Analyse, Design, Entwicklung
- **Details:** Mitarbeit bei der Entwicklung einer Dienstleistungsplattform als iPhone App im Bereich Consumer Services.
- **Plattform:** iOS
- **Werkzeuge:** **iOS SDK 4, Objective C, xcode, IB, Web Requests, XML**

#### Entwicklung einer News iPhone App

Zeitraum: 2010-07 - 2010-08

- **Kunde:** Werbeagentur
- **Rolle:** Analyse, Design, Entwicklung
- **Details:** Entwicklung einer iPhone-App zur Kommunikation von Newsmeldungen im B2B-Bereich. Newsdarstellung als Liste, Detailansicht, PDF-Ansicht, sowie Push-Messages, User-Login, und Zugriffs-Log in Datenbank. Entwickelt wurden die iPhone-App, sowie ein Server-Interface, das vorhandene Daten (News, PDF) für die Verwendung in der App zugänglich macht.
- **Plattform:** iOS, Linux Server
- **Werkzeuge:** iOS SDK 4, Objective C, xcode, Interface Builder, PHP4, SQL, MySQL, SOAP, Push

#### Entwicklung einer iPhone App für Telekommunikationskonzern

Zeitraum: 2010-07 - 2010-08

- **Kunde:** Konzern-Subunternehmer, Endkunde: **Telekommunikationskonzern**
- **Rolle:** Programmdesign, Entwicklung
- **Details:** Entwicklung einer iPhone-App für einen großen deutschen Telekommunikationskonzern im Bereich Gebührenzahlung.
- **Plattform:** iOS
- **Werkzeuge:** Apple iPhone SDK 3 (auf Kundenwunsch), Objective C, xcode, Interface Builder

#### Neuentwicklung einer iPhone App für Immobilienportal

Zeitraum: 2009-11

- **Kunde:** Webagentur, Endkunde: **Immobilienportal**
- **Rolle:** Analyse, Design, Entwicklung
- **Details:** Entwicklung einer App als Starter für die Plattform eines Immobilienportals. Abfrage von Lokationsinformationen (GPS), Suche und Darstellung von Immobilien aus der DB per Suchtext/Ort oder Geokoordinaten, zudem Benutzerlogin.
- **Plattform:** iOS
- **Werkzeuge:** **iOS SDK 3**, Objective C, xcode, Interface Builder, GPS-API

#### Datenbankentwicklung SQL Server

Zeitraum: 2009-02 - 2009-12

- **Kunde:** **Siemens IT-Solutions / Bundesagentur für Arbeit**
- **Rolle:** Datenbankentwickler
- **Details:** SQL-Entwicklung in einem umfangreichen Datenbanksystem, mit dem bundesweit das gesamte Inventar der Bundesagentur für Arbeit verwaltet wird. Umsetzen von RfCs (Request for Change), Entwickeln von Reports, Komplexe Massendatenänderungen.
- **Plattform:** Windows XP, Windows 2003 Server, Unix
- **Werkzeuge:** **MS SQL Server 2000 u. 2008**, SQL, SQL-Server Tools, Reporting, DTS, **Crystal Reports**, Visual Studio und MS.NET für Code-Generierung

#### iPhone Radio Apps

Zeitraum: 2009-01 - 2009-03

- **Kunde:** Softwarehaus
- **Rolle:** Entwicklung
- **Details:** Mitarbeit an mehreren iPhone Apps zum Empfangen von Radioprogrammen auf dem iPhone.
- **Plattform:** iOS
- **Werkzeuge:** **iOS SDK 3**, Objective C, xcode, Interface Builder

#### Tool für Zeiterfassung, Projektverfolgung und Abrechnung in SW-Projekten

Zeitraum: 2008-07

- **Kunde:** Softwarehaus
- **Rolle:** Analyse, Design, Entwicklung
- **Details:** Hauptzweck: Kontrolle der Budgeteinhaltung in Softwareprojekten. Entwicklung einer Access-basierten Mehrbenutzerlösung zur auftrags- bzw. aufgabenbezogenen Erfassung von Arbeitszeiten, mit Auswertung zur Verfolgung der Einhaltung von Zeiten und Budgets, sowie Funktionen zur Abrechnung mit Endkunden und MA. Zudem Auftragsverwaltung, Aufgabenübersicht je Anwender, mit der Möglichkeit Anwendern Aufgaben zuzuordnen. Integriertes Pflichtenheft je Auftrag. Benutzerverwaltung mit unterschiedlichen Zugriffsmöglichkeiten je nach Anwenderrolle (Entwickler, Geschäftsführung).
- **Plattform:** Windows XP
- **Werkzeuge:** **MS Access 2003**, VBA, **SQL**

#### Entwicklung einer Bug-Reporting-Komponente mit Anbindung an ein Bug Tracking System

Zeitraum: 2008-03

- **Kunde:** Softwarehaus
- **Rolle:** Entwicklung
- **Details:** Entwicklung einer Problem-Report-Komponente für eine Anwendung aus dem Bereich technische Dokumentation. Anbindung an ein Bug Tracking System.
- **Plattform:** Windows XP
- **Werkzeuge:** **C#**, Visual Studio 2008, **.NET Framework 3.0**, WPF, WebServices

#### Neuentwicklung eines ERP-Systems

Zeitraum: 2007-12 - 2008-03

- **Kunde:** Softwarehaus
- **Rolle:** Analyse, Design, Entwicklung
- **Details:** Entwicklung eines ERP-Systems/Fakturierung für KMUs, mit: Kundenstamm, Lieferantenstamm, Artikel, Preise pro Lieferant, Aufträge, Bestellungen, komplette Dokumenthistorie pro Vorgang, Oberfläche optimiert für einfache Bedienung, Such- und Filterfunktionen, Druckfunktionen. (Ca. 60% implementiert. Fertigstellung wurde vom Kunden auf Ende 2008 verschoben.)  Design der relationalen Datenbasis, SQL-Entwicklung, Gestaltung des User Interface, Entwicklung der Client-Applikation.
- **Plattform:** Windows XP
- **Werkzeuge:** **Visual Basic.NET**, Visual Studio, MS .NET-Framework, WinForms, ADO.NET, Xceed Controls, **SQL**, MS Access

#### Neuentwicklung einer Anwendung für Datenbereinigung

Zeitraum: 2007-11, 2008-07 - 2008-08

- **Kunde:** Subunternehmer, Endkunde: **Autozulieferer-Konzern**
- **Rolle:** Analyse, Design, Entwicklung
- **Details:** Entwicklung einer Software zur flexiblen Prüfung und Bereinigung von großen Oracle-Datenbanken mit mehreren Millionen Datensätzen (Statistik-Daten aus der industriellen Produktion). Später: Beratende Tätigkeit bei der Integration des Tools in eine größere Anwendung. Implementierung von weiteren Komponenten.
- **Plattform:** Windows XP
- **Werkzeuge:** **Visual Basic.NET**, Visual Studio, MS .NET-Framework, WinForms, **Oracle Datenbank**, PL/SQL, Oracle SQL Developer, MS Access, Q-DAS

#### Komponente zur Erstellung von hierarchischen Datenfiltern

Zeitraum: 2008-04 - 2008-05

- **Kunde:** Subunternehmer, Endkunde: **Autozulieferer-Konzern**
- **Rolle:** Analyse, Design, Entwicklung
- **Details:** Entwicklung einer allgemein verwendbaren Komponente (DLL) für die Erstellung von hierarchischen, benutzerdefinierten (Endlos-)Datenfiltern in VB.NET-Anwendungen. XML-Format für Filterdefinitionen. Die Komponente soll in mehreren Anwendungen zum Einsatz kommen.
- **Plattform:** Windows XP
- **Werkzeuge:** **Visual Basic.NET**, Visual Studio, MS .NET-Framework, WinForms, **Oracle Datenbank**, PL/SQL, Oracle SQL Developer, XML

#### Neuentwicklung einer Anwendung für den IT-Support

Zeitraum: 2007-07 - 2008-12

- **Kunde:** Subunternehmer, Endkunde: **Autozulieferer-Konzern**
- **Rolle:** Analyse, Design, Entwicklung
- **Details:** Neuentwicklung einer Anwendung für den werksinternen IT-Support, mit: Ticketsystem, Vorgangsspeicherung pro Ticket (komplette Historie), Ticket-Workflow mit Berücksichtigung von Subunternehmern, E-Mail-Versand aus der Anwendung, Wissensdatenbank, Auswertungsberichte, umfangreiche grafische Auswertungen (Balkendiagramme, Tortendiagramme inkl. hierarchische Datenfilter), Druckfunktionen aller Daten, Zugriffsberechtigungen, und einiges mehr. Entwicklung der kompletten Applikation: Design der relationalen Datenbasis. Entwicklung von Queries und Procedures mit PL/SQL. Entwicklung der kompletten Client-Applikation. Weiterentwicklung nach Anforderung. In 08.08 interessierte sich eine weitere Abteilung für das Programm: Entwicklung einer abgewandelten Version der Anwendung.
- **Plattform:** Windows XP
- **Werkzeuge:** **Visual Basic.NET**, Visual Studio, MS .NET-Framework, WinForms, ADO.NET, Xceed Controls, **Oracle Datenbank**, **PL/SQL**, Oracle SQL Developer

#### Neuentwicklung einer werkseiten Anw. für „Anwender-/Zugriffskontrolle“

Zeitraum: 2007-02 - 2008-12

- **Kunde:** Subunternehmer, Endkunde: **Autozulieferer-Konzern**
- **Rolle:** Analyse, Design, Entwicklung
- **Details:** Neuentwicklung einer Anwendung zur zentralisierten Verwaltung, Validierung und Bereitstellung von Daten, Benutzeraccounts und Zugriffsrechte auf inhouse genutzte Anwendungen. Umfangreiche Datenimportfunktionen zur Bereitstellung der Daten aus fünf Quellsystemen. Implementierung der Anbindung von Drittanwendungen an die Applikation zum Zweck einer Zentralisierung von Programmzugriffen. In der Endausbaustufe sollen bis zu 70 Anwendungen, und ein Vielfaches an Installationen angebunden sein. Implementierung von Übersichten und Auswertungen zu allen Accountdaten zu Managementzwecken. Entwicklung der kompletten Applikation: Design der relationalen Datenbasis. Entwicklung von Queries und Procedures mit PL/SQL. Entwicklung des kompletten Client-Applikation. Weiterentwicklung nach Anforderung.
- **Plattform:** Windows XP
- **Werkzeuge:** **Visual Basic.NET**, **C#**, Visual Studio, MS .NET-Framework, WinForms, ADO.NET, Xceed Controls, **Oracle Datenbank**, **PL/SQL**, Oracle SQL Developer, XML

#### Erweiterung einer Anwendung zum weltweiten Dateiaustausch

Zeitraum: 2007-01

- **Kunde:** Subunternehmer, Endkunde: Autozulieferer-Konzern
- **Rolle:** Entwicklung
- **Details:** Erweiterung einer Anwendung zur automatisierten weltweiten Aktualisierung/Verteilung von Dateien um einige Funktionen (in User-Clients, Windows-Service).
- **Plattform:** Windows XP
- **Werkzeuge:** Visual Basic.NET, Visual Studio, MS .NET-Framework, SQL, SQL-Datenbank (SQLite), Sparx EA UML Tool

#### Neuentwicklung einer ERP-Applikation für den Massivholzmöbel-Vertrieb

Zeitraum: 2004-12 - 2006-02

- **Unternehmen:** Eigenentwicklung in Kooperation mit Möbelimporteur
- **Rolle:** Planung, Analyse, Design, Entwicklung
- **Details:** Entwicklung eines kompletten ERP-Systems für die Abwicklung des Handels mit Massivholzmöbeln, und des Verkaufs via Internet. Automatisierung des Vertriebs über den (eigens entwickelten) Webshop und die Ebay-Plattform.
- **Plattform:** Windows XP, SuSE Linux Server (Webserver)
- **Werkzeuge:** MS Access XP, MySQL, PHP4, Visual Studio, C#

#### Vorbereitung zum Rework von ca. 10 Access-Anwendungen

Zeitraum: 2004-11 - 2004-12

- **Kunde:** Softwarehaus, Endkunde: DATEV e.G.
- **Rolle:** Analyse, Design, Entwicklung
- **Details:** Vorbereitungen zur Überarbeitung von ca. 10 Access-Anwendungen nach Umstellung auf den SP 2 von Windows XP: Anforderungsanalyse, Implementierung automatisierte Programm-Umstellung.
- **Plattform:** Windows XP
- **Werkzeuge:** MS Access XP, Visual Studio

#### Technisches Angeb. für Redesign Client/Server-Anwendung

Zeitraum: 2004-10

- **Kunde:** EDS Schweinfurt, Solution Center, Endkunde: SKF (2 Auslandsstandorte)
- **Rolle:** Analyse
- **Details:** Pre-Study für das Redesign eines Projektcontrolling-Systems. Analyse des Ist-Systems mit 140 Usern an zwei Standorten. Ausarbeitung einer technischen Studie mit mehreren Redesign-Strategien. Zeit- und Kostenkalkulation.
- **Plattform:** Windows NT, Unix
- **Werkzeuge:** Sybase Datenbank und PowerBuilder für Testzwecke

#### Entwicklung einer Webplattform für Print-Lösungen

Zeitraum: 2004-07 - 2004-10

- **Unternehmen:** Eigenes Unternehmen
- **Rolle:** Entwicklung
- **Details:** Entwicklung einer Webplattform für Print-Lösungen (Produktentwicklung). Projekt nach 10/04 nicht weiter verfolgt.
- **Plattform:** Windows, Linux Server
- **Werkzeuge:** **PHP5, SQL, MySQL, HTML, XAMPP**

#### MS Office Schulungen für Selbstständige Kursteilnehmen

Zeitraum: 2004-05 - 2005-06

- Institut 2F Informatik GmbH, Innsbruck
- Freiberuflicher MS Office Trainer, Schulung von Unternehmern

#### Mitarbeit an der Neuentwicklung eines Application Framework

Zeitraum: 2002-01 - 2002-11

- **Unternehmen:** Systemhaus/Branchensoftware Betonindustrie
- **Rolle:** Entwicklung
- **Team:** 3 MA
- **Details:** Mitarbeit an der Implementierung eines Application-Framework für kaufm./technische Anwendungen. Funktion: Generierung der relationalen Datenbasis, GUI/konfigurierbare Oberflächenlogik zur Laufzeit (auf Basis eines UML-Models in XML-Form)
- **Plattform:** Windows 2000/Cygwin, Linux
- **Werkzeuge:** **Java, XML, XSLT, Together UML, JBuilder**

#### Neuentwicklung einer Software für Produktionssteuerung in Betonwerken

Zeitraum: 2001-02 - 2002-06

- **Unternehmen:** Systemhaus/Branchensoftware Betonindustrie, Endkunden: **Saint Gobain Konzern**, 2 Betonwerke Deutschland
- **Rolle:** Projektleitung/Entwicklung
- **Team:** 3 - 4 MA
- **Details:** Neuentwicklung einer Software für die Produktion in Betonwerken: Produktionssteuerung, Auftragsabwicklung, Sammeln von Produktionsdaten, Genereren statistischer Auswertungen, Anbindung an Fakturierungssysteme. Zudem Vor-Ort-Installationen mit kundenspezifischem Customizing der Software: Versch. Installationsprojekte der Software bei Werken in Deutschland und Nordfrankreich: Entwicklung von Erweiterungen nach Anforderung, Anpassung von Formaten an die Werksanlage und an kaufm. Software.
- **Aufgaben:** Projektleitung, Kundenberatung, Analyse und Design, GUI Workflow/Implementierung von Kernfunktionalität, Koordination mit einem Hersteller von Steuerungsanlagen
- **Plattform:** Windows NT/2000
- **Werkzeuge:** **MS Access, Visual Basic, Winsock, SQL Server**

#### Migration einer Dispositionssoftware

Zeitraum: 2001-01 - 2001-02

- **Kunde:** Systemhaus/Branchensoftware Betonindustrie
- **Rolle:** Analyse, Entwicklung
- **Details:** Migration einer sehr umfangreichen Software für Fuhrparksdisposition von Borland C++ nach Visual C++ und Win32.
- **Plattform:** Windows 2000
- **Werkzeuge:** Borland C++, Visual C++, Visual Basic (für Codegenerierung Resource Files)

#### Euro-Umstellung einer Fakturierungsanwendung

Zeitraum: 2001-10 - 2001-12

- **Unternehmen:** Systemhaus/Branchensoftware Betonindustrie
- **Rolle:** Analyse, Design, Entwicklung
- **Details:** Entwicklung eines Tools zur Euro-Umstellung von ca. 300 Installationen (10.01). Anschließend sukzessive Durchführung der Umstellung aller Kunden.
- **Plattform:** Windows (Version des Kunden)
- **Werkzeuge:** MS Visual C

#### Weiterentwicklung von 3 Softwareprodukten

Zeitraum: 2000-09 - 2003-01

- **Unternehmen:** Systemhaus/Branchensoftware Betonindustrie
- **Rolle:** Analyse, Design, Entwicklung
- **Details:** Entwicklungsaufgaben in 3 Produkten (Fakturierung, FiBu und Fuhrparkdisposition)
  - Entwicklung von funktionalen Erweiterungen nach Anforderung
  - Erstellen/Anpassen von Formularen (Forth-ähnliche Sprache)
  - Erstellen/Anpassen vom Import-/Export-Schnittstellen (Produktionsanlagen, FiBu ...)
- **Plattform:** Windows 95/98/NT/2000/XP
- **Werkzeuge:** C, Visual C++, Borland C++, MFC, dBase IV/V (eigene DB-API), Forth-ähnliche Sprache

#### Mitarbeit in einer Firma bereits zur Schulzeit

Zeitraum: 1996-01 - 1999-09

- **Unternehmen:** Systemhaus
- **Rolle:** Entwicklung
- **Details:** Verschiedene Projekte im Rahmen einer Nebentätigkeit zur Schulzeit: Weiterentwicklung FiBu, verschiedene Tools.
- **Plattform:** Windows NT
- **Werkzeuge:** MS Access, Visual Basic, C, Visual C++, MFC`;

// System instruction template
const SYSTEM_INSTRUCTION_TEMPLATE = `You are Walter's AI assistant on his personal developer portfolio website.

Your role is to help visitors learn about Walter's skills, experience, projects and career goals by answering their questions in a friendly, professional manner.

CRITICAL LANGUAGE RULES - READ CAREFULLY:
1. DETECT the user's language from their speech (German or English)
2. RESPOND 100% in that SAME language - every single word
3. If user speaks German → use ONLY German Context below and speak ONLY German
4. If user speaks English → use ONLY English Context below and speak ONLY English
5. NEVER mix languages in your response
6. NEVER use words from the context's language if it differs from the user's language
7. Translate concepts if needed, but ALWAYS match the user's language exactly

GERMAN PRONUNCIATION RULES:
- When speaking German, pronounce short words like "mit", "im", "um", "am", "zu", "bei" as complete words
- DON'T spell them out letter by letter (e.g., say "mit" as one syllable instead of "m-i-t")
- These are common German prepositions and articles, no abbreviations
- Speak them naturally as single words in fluent German speech
- Pronounce German umlauts correctly: ä (like "eh"), ö (like "uh" with rounded lips), ü (like "ee" with rounded lips)
- Examples: "für" (fuer), "über" (ueber), "können" (koennen) - speak as complete words with proper umlauts

VOICE OUTPUT RULES:
- You are a voice-only assistant. You MUST OUTPUT NO text, markdown, or thought traces.
- Your output must be PURE AUDIO.
- Don't generate any text starting with "**" or "Thought:".
- Speak the answer directly and immediately.
- Keep responses concise and conversational.

CONTENT RULES:
- Use the context ONLY for factual information about Walter.
- DON'T copy phrases or wording from the context.
- Rephrase information naturally in the user's detected language.
- Be enthusiastic about Walter's skills and projects.
- If asked about something missing in the context, politely say you don't have that information.

# English Context
{context_en}

# German Context (Deutscher Kontext)
{context_de}`;

export default {
  async fetch(request, env, ctx)
{
  // CORS headers - allow requests from your GitHub Pages
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
  }

  // Handle preflight OPTIONS request
  if( request.method === 'OPTIONS' )
  {
    return new Response(null, {
      status: 200,
      headers: corsHeaders
    })
  }

  // Only allow POST requests
  if( request.method !== 'POST' )
  {
    return new Response(JSON.stringify({
      success: false,
      error: 'Method not allowed'
    }), {
      status: 405,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json'
      }
    })
  }

  try
  {
    // Parse request body
    const data = await request.json()
    
    // Validate action
    if( !data.action )
    {
      throw new Error('Missing action parameter')
    }
    
    // Handle get_session_config action - returns WebSocket URL and system instruction
    if( data.action === 'get_session_config' )
    {
      // Check if API key is configured
      if( GOOGLE_AI_API_KEY === 'YOUR_API_KEY_HERE' )
      {
        throw new Error('API key not configured in worker')
      }
      
      // Build WebSocket URL with API key
      const wsUrl = `wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1beta.GenerativeService.BidiGenerateContent?key=${GOOGLE_AI_API_KEY}`
      
      // Build system instruction with context
      const systemInstruction = SYSTEM_INSTRUCTION_TEMPLATE
        .replace('{context_en}', CONTEXT_EN)
        .replace('{context_de}', CONTEXT_DE)
      
      return new Response( JSON.stringify({
        success: true,
        websocket_url: wsUrl,
        model: MODEL_NAME,
        system_instruction: systemInstruction,
        greeting_message: GREETING_MESSAGE
      }), {
        status: 200,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      })
    }
    
    // Invalid action
    throw new Error('Invalid action')
  }
  catch( error )
  {
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), {
      status: 400,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json'
      }
    })
  }
  }
};
