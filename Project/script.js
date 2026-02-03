// Portfolio Builder Application
class PortfolioBuilder {
    constructor() {
        this.currentPage = 'welcomePage';
        this.portfolioData = {
            template: null,
            font: 'Poppins',
            personalInfo: {},
            aboutMe: '',
            careerObjective: '',
            skills: [],
            projects: [],
            experiences: [],
            education: [],
            languages: [],
            certifications: [],
            internships: []
        };
        
        this.initializeEventListeners();
        this.loadTemplates();
        this.loadFonts();
    }
    
    initializeEventListeners() {
        // Navigation
        document.getElementById('buildBtn').addEventListener('click', () => this.showPage('templatePage'));
        document.getElementById('startBuilding').addEventListener('click', () => this.showPage('templatePage'));
        
        // Template selection
        document.getElementById('backToWelcome').addEventListener('click', () => this.showPage('welcomePage'));
        
        // Personal info navigation
        document.getElementById('backToTemplates').addEventListener('click', () => this.showPage('templatePage'));
        document.getElementById('nextToObjective').addEventListener('click', () => {
            this.savePersonalInfo();
            this.showPage('careerObjectivePage');
        });
        
        // Career objective navigation
        document.getElementById('backToPersonalInfo').addEventListener('click', () => this.showPage('personalInfoPage'));
        document.getElementById('nextToSkills').addEventListener('click', () => {
            this.saveCareerObjective();
            this.showPage('skillsPage');
        });
        
        // Skills navigation
        document.getElementById('backToObjective').addEventListener('click', () => this.showPage('careerObjectivePage'));
        document.getElementById('nextToProjects').addEventListener('click', () =>   this.showPage('projectsPage'));
        
        
        // Projects navigation
        document.getElementById('backToSkills').addEventListener('click', () => this.showPage('skillsPage'));
        document.getElementById('nextToExperience').addEventListener('click', () => this.showPage('experiencePage'));
        
        // Experience navigation
        document.getElementById('backToProjects').addEventListener('click', () => this.showPage('projectsPage'));
        document.getElementById('nextToEducation').addEventListener('click', () => this.showPage('educationPage'));
        
        // Education navigation
        document.getElementById('backToExperience').addEventListener('click', () => this.showPage('experiencePage'));
        document.getElementById('nextToLanguages').addEventListener('click', () => this.showPage('languagesPage'));
        
        // Languages navigation
        document.getElementById('backToEducation').addEventListener('click', () => this.showPage('educationPage'));
        document.getElementById('generatePortfolio').addEventListener('click', () => {
            this.saveLanguagesAndMore();
            this.generatePortfolio();
            this.showPage('portfolioPreviewPage');
        });
        
        // Back to edit from preview
        document.getElementById('backToLanguages').addEventListener('click', () => this.showPage('languagesPage'));

    
        // Portfolio actions
        document.getElementById('downloadHTML').addEventListener('click', () => this.downloadPortfolio());
        document.getElementById('copyCode').addEventListener('click', () => this.copyPortfolioCode());
        document.getElementById('viewFullscreen').addEventListener('click', () => this.viewFullscreen());
        document.getElementById('deployPortfolio').addEventListener('click', () => this.deployPortfolio());

        
        // Success page 
        document.getElementById('createNew').addEventListener('click', () => this.resetBuilder());
        document.getElementById('viewPortfolio').addEventListener('click', () => this.viewPortfolio());
        document.getElementById('copyURL').addEventListener('click', () => this.copyURL());
       
        
        // Photo upload
        document.getElementById('uploadArea').addEventListener('click', () => document.getElementById('photoInput').click());
        document.getElementById('photoInput').addEventListener('change', (e) => this.handlePhotoUpload(e));
        
        // Skills
        document.getElementById('addSkill').addEventListener('click', () => this.addSkill());
        document.getElementById('newSkill').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addSkill();
        });
        
        // Languages
        document.getElementById('addLanguage').addEventListener('click', () => this.addLanguage());
        document.getElementById('newLanguage').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addLanguage();
        });
        
        // Certifications
        document.getElementById('addCertification').addEventListener('click', () => this.addCertification());
        document.getElementById('newCertification').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addCertification();
        });
        
        // Modals
        document.getElementById('addProjectBtn').addEventListener('click', () => this.openModal('projectModal'));
        document.getElementById('addExperienceBtn').addEventListener('click', () => this.openModal('experienceModal'));
        document.getElementById('addEducationBtn').addEventListener('click', () => this.openModal('educationModal'));
        document.getElementById('addInternshipBtn').addEventListener('click', () => this.openModal('internshipModal'));
        
        // Modal forms
        document.getElementById('projectForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addProject();
        });
        
        document.getElementById('experienceForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addExperience();
        });
        
        document.getElementById('educationForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addEducation();
        });
        
        document.getElementById('internshipForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addInternship();
        });
        
        // Close modals
        document.querySelectorAll('.close-modal').forEach(btn => {
            btn.addEventListener('click', () => this.closeModal());
        });
        
        // Preview navigation
        document.querySelectorAll('.preview-nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.switchPreviewSection(e.target.dataset.section));
        });
    }
    
    showPage(pageId) {
        // Hide all pages
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });
        
        // Show selected page
        document.getElementById(pageId).classList.add('active');
        this.currentPage = pageId;
        
        // Update preview if on preview page
        if (pageId === 'portfolioPreviewPage') {
            this.updatePortfolioPreview();
        }
    }
    
    loadTemplates() {
        const container = document.getElementById('templatesContainer');
        container.innerHTML = '';
        
        templates.forEach((template, index) => {
            const templateCard = document.createElement('div');
            templateCard.className = 'template-card';
            templateCard.style.setProperty('--template-color-1', template.colors[0]);
            templateCard.style.setProperty('--template-color-2', template.colors[1]);
            
            templateCard.innerHTML = `
                <div class="template-preview">
                    <div class="template-pattern"></div>
                </div>
                <div class="template-info">
                    <h3>${template.name}</h3>
                    <p>${template.description}</p>
                    <button class="select-btn" data-id="${index}">Select Template</button>
                </div>
            `;
            
            templateCard.querySelector('.select-btn').addEventListener('click', (e) => {
                this.selectTemplate(index);
                this.showPage('personalInfoPage');
            });
            
            container.appendChild(templateCard);
        });
    }
    
    loadFonts() {
        const fontOptions = [
            { name: 'Poppins', class: 'font-poppins' },
            { name: 'Arimo', class: 'Arimo' },
            { name: 'Nunito', class: 'Nunito' },
           
        ];
        
        const container = document.getElementById('fontOptions');
        container.innerHTML = '';
        
        // Load Google Fonts
        const link = document.createElement('link');
        link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&family=Montserrat:wght@300;400;500;600&family=Open+Sans:wght@300;400;500;600&family=Roboto:wght@300;400;500&family=Playfair+Display:wght@400;500;600&family=Lato:wght@300;400;500&family=Raleway:wght@300;400;500&display=swap';
        link.href= 'https://fonts.googleapis.com/css2?family=Arimo:ital,wght@0,400..700;1,400..700&family=Hind+Siliguri:wght@300;400;500;600;700&family=Nunito:ital,wght@0,200..1000;1,200..1000&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap';
        link.rel = 'stylesheet';
        document.head.appendChild(link);
        
        fontOptions.forEach(font => {
            const option = document.createElement('div');
            option.className = 'font-option';
            option.innerHTML = `
                <span style="font-family: '${font.name}', sans-serif">${font.name}</span>
            `;
            
            option.addEventListener('click', () => {
                document.querySelectorAll('.font-option').forEach(opt => {
                    opt.classList.remove('selected');
                });
                option.classList.add('selected');
                this.portfolioData.font = font.name;
            });
            
            if (font.name === 'Poppins') {
                option.classList.add('selected');
            }
            
            container.appendChild(option);
        });
    }
    
    selectTemplate(index) {
        this.portfolioData.template = templates[index];
    }
    
    savePersonalInfo() {
        this.portfolioData.personalInfo = {
            fullName: document.getElementById('fullName').value,
            profession: document.getElementById('profession').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            location: document.getElementById('location').value,
            github: document.getElementById('github').value,
            linkedin: document.getElementById('linkedin').value
        };
    }
    
    saveCareerObjective() {
        this.portfolioData.aboutMe = document.getElementById('aboutMe').value;
        this.portfolioData.careerObjective = document.getElementById('careerObjective').value;
    }

    addSkill() {
        const skillInput = document.getElementById('newSkill');
        const skill = skillInput.value.trim();
        
        if (skill) {
            this.portfolioData.skills.push(skill);
            this.updateSkillsList();
            skillInput.value = '';
        }
    }
    
    updateSkillsList() {
        const container = document.getElementById('skillsList');
        
        if (this.portfolioData.skills.length === 0) {
            container.innerHTML = '';
            return;
        }
        
        container.innerHTML = this.portfolioData.skills.map((skill, index) => `
            <div class="skill-item">
                <i class="fas fa-check-circle"></i>
                <span>${skill}</span>
                <button class="remove-btn" onclick="portfolioBuilder.removeSkill(${index})">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `).join('');
    }
    
    removeSkill(index) {
        this.portfolioData.skills.splice(index, 1);
        this.updateSkillsList();
    }
    
    openModal(modalId) {
        document.getElementById(modalId).style.display = 'block';
    }
    
    closeModal() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.style.display = 'none';
        });
        this.clearModalForms();
    }

 
    
    clearModalForms() {
        document.getElementById('projectForm').reset();
        document.getElementById('experienceForm').reset();
        document.getElementById('educationForm').reset();
        document.getElementById('internshipForm').reset();
    }
    
    addProject() {
        const project = {
            title: document.getElementById('projectTitle').value,
            description: document.getElementById('projectDescription').value,
            link: document.getElementById('projectLink').value,   
        };
        
        this.portfolioData.projects.push(project);
        this.updateProjectsList();
        this.closeModal();
    }
    
    updateProjectsList() {
        const container = document.getElementById('projectsContainer');
        
        if (this.portfolioData.projects.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-project-diagram"></i>
                    <p>No projects added yet. Click "Add Project" to get started!</p>
                </div>
            `;
            return;
        }
        
        container.innerHTML = this.portfolioData.projects.map((project, index) => `
            <div class="item-card">
                <div class="item-header">
                    <div class="item-actions">
                        <button class="edit-btn" onclick="portfolioBuilder.editProject(${index})">
                            <i class="fas fa-edit"></i> Edit
                        </button>
                        <button class="delete-btn" onclick="portfolioBuilder.removeProject(${index})">
                            <i class="fas fa-trash"></i> Delete
                        </button>
                    </div>
                </div>
                <div class="item-details">
                    ${project.link ? `
                         <p><strong>Title:</strong> ${project.title}</p>
                         <p><strong>Description:</strong> ${project.description}</p>
                         <p><strong>Link:</strong> <a href="${project.link}" target="_blank">${project.link}</a></p>` : ''}
                   
                </div>
            </div>
        `).join('');
    }
    
    editProject(index) {
        const project = this.portfolioData.projects[index];
        document.getElementById('projectTitle').value = project.title;
        document.getElementById('projectDescription').value = project.description;
        document.getElementById('projectLink').value = project.link;
        
        this.portfolioData.projects.splice(index, 1);
        this.openModal('projectModal');
    }
    
    removeProject(index) {
        this.portfolioData.projects.splice(index, 1);
        this.updateProjectsList();
    }
    
    addExperience() {
        const experience = {
            years: document.getElementById('jobYears').value,
            companyName: document.getElementById('companyName').value,
            jobrole: document.getElementById('jobrole').value,
            description: document.getElementById('jobDescription').value
        };
        
        this.portfolioData.experiences.push(experience);
        this.updateExperiencesList();
        this.closeModal();
    }
    
    updateExperiencesList() {
        const container = document.getElementById('experiencesContainer');
        
        if (this.portfolioData.experiences.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-briefcase"></i>
                    <p>No experience added yet. Click "Add Experience" to get started!</p>
                </div>
            `;
            return;
        }
        
        container.innerHTML = this.portfolioData.experiences.map((exp, index) => `
            <div class="item-card">
                <div class="item-header">
                    <div class="item-actions">
                        <button class="edit-btn" onclick="portfolioBuilder.editExperience(${index})">
                            <i class="fas fa-edit"></i> Edit
                        </button>
                        <button class="delete-btn" onclick="portfolioBuilder.removeExperience(${index})">
                            <i class="fas fa-trash"></i> Delete
                        </button>
                    </div>
                </div>
                <div class="item-details">
                    <p><strong>Duration:</strong> ${exp.years}</p>
                    <p><strong>Company Name:</strong> <span class="company-name">${exp.companyName}</span></p>
                    <p><strong>Job role:</strong> ${exp.jobrole}</p>
                    <p><strong>Description:</strong> ${exp.description}</p>
                </div>
            </div>
        `).join('');
    }
    
    editExperience(index) {
        const exp = this.portfolioData.experiences[index];
       
        document.getElementById('jobYears').value = exp.years;
        document.getElementById('companyName').value = exp.companyName;
        document.getElementById('jobrole').value = exp.jobrole;
        document.getElementById('jobDescription').value = exp.description;
        
        this.portfolioData.experiences.splice(index, 1);
        this.openModal('experienceModal');
    }
    
    removeExperience(index) {
        this.portfolioData.experiences.splice(index, 1);
        this.updateExperiencesList();
    }
    
    addEducation() {
        const education = {
            degree: document.getElementById('degree').value,
            institute: document.getElementById('institute').value,
            year: document.getElementById('educationYear').value
        
        };
        
        this.portfolioData.education.push(education);
        this.updateEducationList();
        this.closeModal();
    }
    
    updateEducationList() {
        const container = document.getElementById('educationsContainer');
        
        if (this.portfolioData.education.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-graduation-cap"></i>
                    <p>No education added yet. Click "Add Education" to get started!</p>
                </div>
            `;
            return;
        }
        
        container.innerHTML = this.portfolioData.education.map((edu, index) => `
            <div class="item-card">
                <div class="item-header">
                    <div class="item-actions">
                        <button class="edit-btn" onclick="portfolioBuilder.editEducation(${index})">
                            <i class="fas fa-edit"></i> Edit
                        </button>
                        <button class="delete-btn" onclick="portfolioBuilder.removeEducation(${index})">
                            <i class="fas fa-trash"></i> Delete
                        </button>
                    </div>
                </div>
                <div class="item-details">
                    <p><strong>Degree:</strong> ${edu.degree}</p
                    <p><strong>Year:</strong> ${edu.year}</p>
                    <p><strong>Institute:</strong> ${edu.institute}</p>
                </div>
            </div>
        `).join('');
    }
    
    editEducation(index) {
        const edu = this.portfolioData.education[index];
        document.getElementById('degree').value = edu.degree;
        document.getElementById('educationYear').value = edu.year;
        document.getElementById('institute').value = edu.institute;
        
        this.portfolioData.education.splice(index, 1);
        this.openModal('educationModal');
    }
    
    removeEducation(index) {
        this.portfolioData.education.splice(index, 1);
        this.updateEducationList();
    }
    
    addLanguage() {
        const languageInput = document.getElementById('newLanguage');
        const language = languageInput.value.trim();
        
        if (language) {
            this.portfolioData.languages.push(language);
            this.updateLanguagesList();
            languageInput.value = '';
        }
    }
    
    updateLanguagesList() {
        const container = document.getElementById('languagesList');
        
        if (this.portfolioData.languages.length === 0) {
            container.innerHTML = '';
            return;
        }
        
        container.innerHTML = this.portfolioData.languages.map((language, index) => `
            <div class="language-item">
                <i class="fas fa-language"></i>
                <span>${language}</span>
                <button class="remove-btn" onclick="portfolioBuilder.removeLanguage(${index})">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `).join('');
    }
    
    removeLanguage(index) {
        this.portfolioData.languages.splice(index, 1);
        this.updateLanguagesList();
    }
    
    addCertification() {
        const certInput = document.getElementById('newCertification');
        const certification = certInput.value.trim();
        
        if (certification) {
            this.portfolioData.certifications.push(certification);
            this.updateCertificationsList();
            certInput.value = '';
        }
    }
    
    updateCertificationsList() {
        const container = document.getElementById('certificationsList');
        
        if (this.portfolioData.certifications.length === 0) {
            container.innerHTML = '';
            return;
        }
        
        container.innerHTML = this.portfolioData.certifications.map((cert, index) => `
            <div class="cert-item">
                <i class="fas fa-certificate"></i>
                <span>${cert}</span>
                <button class="remove-btn" onclick="portfolioBuilder.removeCertification(${index})">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `).join('');
    }
    
    removeCertification(index) {
        this.portfolioData.certifications.splice(index, 1);
        this.updateCertificationsList();
    }
    
    addInternship() {
        const internship = {
            company: document.getElementById('internCompany').value,
            role: document.getElementById('internRole').value,
            duration: document.getElementById('internDuration').value,
            description: document.getElementById('internDescription').value
        };
        
        this.portfolioData.internships.push(internship);
        this.updateInternshipsList();
        this.closeModal();
    }
    
    updateInternshipsList() {
        const container = document.getElementById('internshipsContainer');
        
        if (this.portfolioData.internships.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-building"></i>
                    <p>No internships added yet. Click "Add Internship" to get started!</p>
                </div>
            `;
            return;
        }
        
        container.innerHTML = this.portfolioData.internships.map((intern, index) => `
            <div class="item-card">
                <div class="item-header">
                    <div class="item-actions">
                        <button class="edit-btn" onclick="portfolioBuilder.editInternship(${index})">
                            <i class="fas fa-edit"></i> Edit
                        </button>
                        <button class="delete-btn" onclick="portfolioBuilder.removeInternship(${index})">
                            <i class="fas fa-trash"></i> Delete
                        </button>
                    </div>
                </div>
                <div class="item-details">
                    <p><strong>Company:</strong> ${intern.company}</p>
                    ${intern.role ? `<p><strong>course:</strong> ${intern.role}</p>` : ''}
                    ${intern.duration ? `<p><strong>Duration:</strong> ${intern.duration}</p>` : ''}
                    ${intern.description ? `<p><strong>Description:</strong> ${intern.description}</p>` : ''}
                </div>
            </div>
        `).join('');
    }
    
    editInternship(index) {
        const intern = this.portfolioData.internships[index];
        document.getElementById('internCompany').value = intern.company;
        document.getElementById('internRole').value = intern.role;
        document.getElementById('internDuration').value = intern.duration;
        document.getElementById('internDescription').value = intern.description || '';
        
        this.portfolioData.internships.splice(index, 1);
        this.openModal('internshipModal');
    }
    
    removeInternship(index) {
        this.portfolioData.internships.splice(index, 1);
        this.updateInternshipsList();
    }
    
    saveLanguagesAndMore() {
        // Already saved through individual methods
    }
    
    generatePortfolio() {
        const preview = document.getElementById('portfolioPreview');
        const template = this.portfolioData.template || templates[0];
        
        // Generate portfolio HTML
        const portfolioHTML = this.generatePortfolioHTML(template);
        preview.innerHTML = portfolioHTML;
        
        // Add interactive functionality
        this.addPortfolioInteractivity();
    }
    
    generatePortfolioHTML(template) {
        const { personalInfo } = this.portfolioData;
        
        return `
            <div class="generated-portfolio" style="
                --template-color-1: ${template.colors[0]};
                --template-color-2: ${template.colors[1]};
                font-family: '${this.portfolioData.font}', sans-serif;
            ">
                <div class="portfolio-header">
                    <div class="profile-section">
                        <div id="profileImageContainer">
                            ${this.getProfileImage()}
                        </div>
                        <div class="profile-info">
                            <h1>${personalInfo.fullName || 'Your Name'}</h1>
                            <h2>${personalInfo.profession || 'Professional Title'}</h2>
                            <div class="contact-links">
                                ${personalInfo.email ? `
                                    <a href="email:${personalInfo.email}" class="contact-link" title="Email">
                                        <i class="fas fa-envelope"></i> Email
                                    </a>
                                ` : ''}
                                
                                ${personalInfo.phone ? `
                                    <a href="tel:${personalInfo.phone}" class="contact-link" title="Call">
                                        <i class="fas fa-phone"></i> Phone
                                    </a>
                                ` : ''}
                                
                                ${personalInfo.location ? `
                                    <a href="https://www.google.com/maps?q=${encodeURIComponent(personalInfo.location)}" 
                                       target="_blank" class="contact-link" title="Location">
                                        <i class="fas fa-map-marker-alt"></i> Location
                                    </a>
                                ` : ''}
                                
                                ${personalInfo.github ? `
                                    <a href="${personalInfo.github}" target="_blank" class="contact-link" title="GitHub">
                                        <i class="fab fa-github"></i> GitHub
                                    </a>
                                ` : ''}
                                
                                ${personalInfo.linkedin ? `
                                    <a href="${personalInfo.linkedin}" target="_blank" class="contact-link" title="LinkedIn">
                                        <i class="fab fa-linkedin"></i> LinkedIn
                                    </a>
                                ` : ''}
                            </div>
                        </div>
                    </div>
                </div>
                 
                <div class="portfolio-section" id="aboutSection">
                ${this.portfolioData.aboutMe ? `
                    <h3><i class="fas fa-user"></i> About Me</h3>
                    <p>${this.portfolioData.aboutMe}</p>
                    ` : ''}
                    <br>
                    ${this.portfolioData.careerObjective ? `
                        <h3><i class="fas fa-bullseye"></i> Career Objective</h3>
                        <p>${this.portfolioData.careerObjective}</p>
                    ` : ''}
                </div>
                
                ${this.portfolioData.skills.length > 0 ? `
                    <div class="portfolio-section" id="skillsSection">
                        <h3><i class="fas fa-tools"></i> Skills</h3>
                        <div class="skills-grid">
                            ${this.portfolioData.skills.map(skill => `
                                <div class="skill-tag">${skill}</div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}
                
                  ${this.portfolioData.projects.length > 0 ? `
                    <div class="portfolio-section" id="projectsSection">
                        <h3><i class="fas fa-project-diagram"></i> Projects</h3>
                        ${this.portfolioData.projects.map(project => `
                            <div class="experience-item">
                                <h4>${project.title}</h4>
                                <p>${project.description}</p>
                                 ${project.link ? `
                                    <p><a href="${project.link}" target="_blank" class="project-link">
                                        <i class="fas fa-external-link-alt"></i> View Project
                                    </a></p>
                                ` : ''}
                            </div>
                        `).join('')}
                       
                    </div>
                ` : ''}
            
                
                ${this.portfolioData.experiences.length > 0 ? `
                    <div class="portfolio-section" id="experienceSection">
                        <h3><i class="fas fa-briefcase"></i> Work Experience</h3>
                        ${this.portfolioData.experiences.map(exp => `
                            <div class="experience-item">
                              <p>${exp.years}</p>
                          <h4 style="display:inline;"> <span class="company-name">${exp.companyName}</h4></span>  |    <h4 style="display:inline;">${exp.jobrole}</h4> 
                             <p>${exp.description}</p>
                            </div>
                        `).join('')}
                    </div>
                ` : ''}
                
                ${this.portfolioData.education.length > 0 ? `
                    <div class="portfolio-section" id="educationSection">
                        <h3><i class="fas fa-graduation-cap"></i> Education</h3>
                        ${this.portfolioData.education.map(edu => `
                            <div class="experience-item">
                                <h4 style="display:inline;">${edu.degree}</h4>  |  <p style="display:inline;">${edu.year}</p>
                                <p>${edu.institute}</p>
                            </div>
                        `).join('')}
                    </div>
                ` : ''}
                
                  ${this.portfolioData.internships.length > 0 ? `
                    <div class="portfolio-section">
                        <h3><i class="fas fa-building"></i> Internships</h3>
                        ${this.portfolioData.internships.map(intern => `
                            <div class="experience-item">
                                <h4><span class="interncompany">${intern.company}</h4></span>
                                <h4 style="display:inline;">${intern.role}</h4> | <p style="display:inline;">${intern.duration ? `${intern.duration}` : ''}</p>
                                ${intern.description ? `<p>${intern.description}</p>` : ''}
                            </div>
                        `).join('')}
                    </div>
                ` : ''}
                
                ${this.portfolioData.certifications.length > 0 ? `
                    <div class="portfolio-section">
                        <h3><i class="fas fa-certificate"></i> Certifications & Awards</h3>
                        <ul>
                            ${this.portfolioData.certifications.map(cert => `
                                <li>${cert}</li>
                            `).join('')}
                        </ul>
                    </div>
                ` : ''}
                
              
                 ${this.portfolioData.languages.length > 0 ? `
                    <div class="portfolio-section">
                        <h3><i class="fas fa-language"></i> Languages</h3>
                        <div class="skills-grid">
                            ${this.portfolioData.languages.map(lang => `
                                <div class="skill-tag">${lang}</div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}

            </div>
        `;
    }
    
    getProfileImage() {
        const photoPreview = document.getElementById('photoPreview');
        if (photoPreview.querySelector('img')) {
            const img = photoPreview.querySelector('img');
            return `<img src="${img.src}" alt="Profile" class="profile-img">`;
        }
        return `<div class="profile-img-placeholder">
                    <i class="fas fa-user"></i>
                </div>`;
    }
    
    addPortfolioInteractivity() {
        // Add click handlers for contact links
        setTimeout(() => {
            const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
            const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
            const mapLinks = document.querySelectorAll('a[href^="https://www.google.com/maps"]');
            
            emailLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    window.location.href = link.href;
                });
            });
            
            phoneLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    window.location.href = link.href;
                });
            });
            
            mapLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    window.open(link.href, '_blank');
                });
            });
        }, 100);
    }
    
    updatePortfolioPreview() {
        this.generatePortfolio();
    }
    
    switchPreviewSection(section) {
        // Update active nav button
        document.querySelectorAll('.preview-nav-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.section === section) {
                btn.classList.add('active');
            }
        });
        
        // Scroll to section
        const sectionElement = document.getElementById(`${section}Section`);
        if (sectionElement) {
            sectionElement.scrollIntoView({ behavior: 'smooth' });
        }
    }
    
    handlePhotoUpload(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const preview = document.getElementById('photoPreview');
                preview.innerHTML = `<img src="${e.target.result}" alt="Profile Preview">`;
            };
            reader.readAsDataURL(file);
        }
    }
    
    downloadPortfolio() {
        const template = this.portfolioData.template || templates[0];
        const portfolioHTML = this.generateFullHTML(template);
        
        // Create download link
        const blob = new Blob([portfolioHTML], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'my-portfolio.html';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
    
    generateFullHTML(template) {
        const { personalInfo } = this.portfolioData;
        
        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${personalInfo.fullName || 'My Portfolio'}</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=${this.portfolioData.font.replace(' ', '+')}:wght@300;400;500;600&display=swap" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: '${this.portfolioData.font}', sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }
        
        .portfolio-header {
            background: linear-gradient(135deg, ${template.colors[0]}, ${template.colors[1]});
            color: white;
            padding: 3rem 2rem;
            border-radius: 15px;
            margin-bottom: 2rem;
        }
        
        .profile-section {
            display: flex;
            align-items: center;
            gap: 2rem;
            margin-bottom: 2rem;
        }
        
        .profile-img {
            width: 150px;
            height: 150px;
            border-radius: 50%;
            object-fit: cover;
            border: 5px solid white;
        }
        
        .profile-info h1 {
            font-size: 2.5rem;
            margin-bottom: 0.5rem;
        }
        
        .profile-info h2 {
            font-size: 1.5rem;
            opacity: 0.9;
            margin-bottom: 1rem;
        }
        
        .contact-links {
            display: flex;
            gap: 1rem;
            flex-wrap: wrap;
        }
        
        .contact-link {
            display: flex;
            align-items: center;
            gap: 8px;
            color: white;
            text-decoration: none;
            padding: 0.5rem 1rem;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 20px;
            transition: background 0.3s ease;
        }
        
        .contact-link:hover {
            background: rgba(255, 255, 255, 0.3);
        }
        
        .portfolio-section {
            margin-bottom: 2rem;
            padding: 1.5rem;
            background: #f7fafc;
            border-radius: 10px;
        }
        
        .portfolio-section h3 {
            color: #2d3748;
            margin-bottom: 1rem;
            padding-bottom: 0.5rem;
            border-bottom: 2px solid #e2e8f0;
        }
        
        .skills-grid {
            display: flex;
            flex-wrap: wrap;
            gap: 0.8rem;
        }
        
        .skill-tag {
            background: ${template.colors[0]};
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 15px;
            font-size: 0.9rem;
        }
        
        .experience-item {
            margin-bottom: 1.5rem;
        }
        
        .company-name {
            color: ${template.colors[0]};
            font-weight: 600;
        }
        
        .project-link {
            color: ${template.colors[0]};
            text-decoration: none;
            font-weight: 500;
        }
        
        .project-link:hover {
            text-decoration: underline;
        }
        
        @media (max-width: 768px) {
            .profile-section {
                flex-direction: column;
                text-align: center;
            }
            
            .contact-links {
                justify-content: center;
            }
        }
    </style>
</head>
<body>
    ${this.generatePortfolioHTML(template)}
    
    <script>
        // Interactive functionality
        document.addEventListener('DOMContentLoaded', function() {
            // Email functionality
            const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
            emailLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    window.location.href = this.href;
                });
            });
            
            // Phone functionality
            const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
            phoneLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    window.location.href = this.href;
                });
            });
            
            // Map functionality
            const mapLinks = document.querySelectorAll('a[href^="https://www.google.com/maps"]');
            mapLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    window.open(this.href, '_blank');
                });
            });
        });
    </script>
</body>
</html>`;
    }
    
    copyPortfolioCode() {
        const template = this.portfolioData.template || templates[0];
        const portfolioHTML = this.generateFullHTML(template);
        
        navigator.clipboard.writeText(portfolioHTML).then(() => {
            alert('Portfolio code copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy: ', err);
            alert('Failed to copy code. Please try again.');
        });
    }
    
    viewFullscreen() {
        const template = this.portfolioData.template || templates[0];
        const portfolioHTML = this.generateFullHTML(template);
        
        const newWindow = window.open();
        newWindow.document.write(portfolioHTML);
        newWindow.document.close();
    }
    
    deployPortfolio() {
        // Simulate deployment
        const randomId = Math.random().toString(36).substr(2, 9);
        const portfolioURL = `https://portfolio-trick.com/portfolio-${randomId}`;
        
        document.getElementById('portfolioURL').value = portfolioURL;
        document.getElementById('visitPortfolio').href = portfolioURL;
        
        this.showPage('deploySuccessPage');
    }
    
    copyURL() {
        const urlInput = document.getElementById('portfolioURL');
        urlInput.select();
        document.execCommand('copy');
        alert('URL copied to clipboard!');
    }
    
    viewPortfolio() {
        const portfolioURL = document.getElementById('portfolioURL').value;
        window.open(portfolioURL, '_blank');
    }
    
    resetBuilder() {
        // Reset all data
        this.portfolioData = {
            template: null,
            font: 'Poppins',
            personalInfo: {},
            aboutMe: '',
            careerObjective: '',
            skills: [],
            projects: [],
            experiences: [],
            education: [],
            languages: [],
            certifications: [],
            internships: []
        };
        
        // Reset forms
        document.getElementById('personalInfoForm').reset();
        document.getElementById('aboutMe').value = '';
        document.getElementById('careerObjective').value = '';
        document.getElementById('newSkill').value = '';
        document.getElementById('newLanguage').value = '';
        document.getElementById('newCertification').value = '';
        document.getElementById('photoPreview').innerHTML = '';
        
        // Update lists
        this.updateSkillsList();
        this.updateLanguagesList();
        this.updateCertificationsList();
        this.updateProjectsList();
        this.updateExperiencesList();
        this.updateEducationList();
        this.updateInternshipsList();
        
        // Go back to welcome page
        this.showPage('welcomepage');
    }
}

// Initialize the application
let portfolioBuilder;

document.addEventListener('DOMContentLoaded', () => {
    portfolioBuilder = new PortfolioBuilder();
});