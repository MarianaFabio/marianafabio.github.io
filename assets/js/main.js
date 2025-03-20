document.addEventListener('DOMContentLoaded', function() {
    // Header compacto ao rolar
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 50) {
            header.style.padding = '1rem 0';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.padding = '1.5rem 0';
            header.style.boxShadow = 'none';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Proteção contra cópia de conteúdo
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
    });
    
    document.addEventListener('keydown', function(e) {
        // Previne Ctrl+C, Ctrl+U, Ctrl+S, F12
        if (
            (e.ctrlKey && (e.keyCode === 67 || e.keyCode === 85 || e.keyCode === 83)) ||
            e.keyCode === 123
        ) {
            e.preventDefault();
            return false;
        }
    });
    
    // Configuração do menu mobile
    setupMobileMenu();
    
    // Inicializar projetos dinâmicos (se houver)
    initProjectPage();
    
    // Verificar tamanho da tela para configurar interface mobile/desktop
    checkScreenSize();
    
    // Adicionar event listener para mudanças de tamanho de tela
    window.addEventListener('resize', checkScreenSize);
});

// Função para verificar o tamanho da tela e configurar interface
function checkScreenSize() {
    if (window.innerWidth <= 768) {
        // Esconder ícones sociais no header em mobile
        const headerSocialIcons = document.querySelector('.social-icons');
        if (headerSocialIcons) {
            headerSocialIcons.style.display = 'none';
        }
        
        // Garantir que o menu toggle seja exibido
        const menuToggle = document.querySelector('.menu-toggle');
        if (menuToggle) {
            menuToggle.style.display = 'flex';
        }
    } else {
        // Mostrar ícones sociais no header em desktop
        const headerSocialIcons = document.querySelector('.social-icons');
        if (headerSocialIcons) {
            headerSocialIcons.style.display = 'flex';
        }
        
        // Esconder o menu toggle em desktop
        const menuToggle = document.querySelector('.menu-toggle');
        if (menuToggle) {
            menuToggle.style.display = 'none';
        }
    }
}

function setupMobileMenu() {
    // Criar elementos do menu mobile
    const menuToggle = document.createElement('div');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '<span></span><span></span><span></span>';
    
    // Criar overlay
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    
    // Adicionar elementos ao DOM
    const header = document.querySelector('.header .container');
    const navigation = document.querySelector('.navigation');
    
    if (!header || !navigation) {
        console.error('Header or navigation elements not found');
        return;
    }
    
    // Inserir botão de menu depois dos ícones sociais (à direita)
header.appendChild(menuToggle);
    
    // Reorganizar elementos dentro da navegação
    const navUl = navigation.querySelector('ul');
    if (!navUl) {
        console.error('Navigation list not found');
        return;
    }
    
    const navLinks = document.createElement('div');
    navLinks.className = 'navigation-links';
    
    // Clonar os ícones sociais para o menu mobile
    const socialIcons = document.querySelector('.social-icons');
    if (socialIcons) {
        const mobileSocialIcons = document.createElement('div');
        mobileSocialIcons.className = 'mobile-social-icons';
        mobileSocialIcons.innerHTML = socialIcons.innerHTML;
        
        // Mover a lista de navegação para o contêiner de links
        navigation.innerHTML = '';
        navigation.appendChild(navLinks);
        navLinks.appendChild(navUl);
        
        // Adicionar ícones sociais ao final da navegação
        navigation.appendChild(mobileSocialIcons);
    }
    
    // Adicionar overlay ao body
    document.body.appendChild(overlay);
    
    // Event listeners
    menuToggle.addEventListener('click', function() {
        toggleMobileMenu();
    });
    
    overlay.addEventListener('click', function() {
        closeMobileMenu();
    });
    
    // Fechar menu ao clicar em um link
    const navLinksElements = document.querySelectorAll('.navigation a');
    navLinksElements.forEach(link => {
        link.addEventListener('click', function() {
            closeMobileMenu();
        });
    });
}

function toggleMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navigation = document.querySelector('.navigation');
    const overlay = document.querySelector('.overlay');
    
    if (!menuToggle || !navigation || !overlay) {
        console.error('Menu elements not found');
        return;
    }
    
    menuToggle.classList.toggle('active');
    navigation.classList.toggle('active');
    overlay.classList.toggle('active');
    
    // Impedir rolagem do body quando o menu estiver aberto
    if (navigation.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

function closeMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navigation = document.querySelector('.navigation');
    const overlay = document.querySelector('.overlay');
    
    if (!menuToggle || !navigation || !overlay) return;
    
    if (menuToggle.classList.contains('active')) {
        menuToggle.classList.remove('active');
        navigation.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Função para inicializar a página de detalhes do projeto
function initProjectPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('id');
    
    if (projectId && window.location.pathname.includes('projects.html')) {
        // Dados de exemplo dos projetos em inglês
        const projects = {
            'project1': {
                title: 'Project 1',
                description: 'Detailed description of project 1. This section explains the context, objectives and approach used in this work.',
                challenge: 'The main challenge was to create a cohesive visual identity that would resonate with the target audience while maintaining the brand\'s core values.',
                solution: 'The solution involved extensive research and multiple iterations, resulting in a design system that effectively communicated the desired message.',
                tags: ['UI Design', 'Branding'],
                image: 'assets/images/placeholder-project1.jpg'
            },
            'project2': {
                title: 'Project 2',
                description: 'Detailed description of project 2. This project required a deep understanding of user needs and market trends.',
                challenge: 'We needed to simplify a complex process without losing essential functionality, making it accessible to users with varying levels of technical expertise.',
                solution: 'Through user testing and iterative design, we developed an intuitive interface that significantly improved user satisfaction and task completion rates.',
                tags: ['Product Design', 'UX Research'],
                image: 'assets/images/placeholder-project2.jpg'
            },
            'project3': {
                title: 'Project 3',
                description: 'This project showcases creative illustration work combined with subtle animations to enhance storytelling.',
                challenge: 'The challenge was to create visually engaging illustrations that would work both in static and animated formats across multiple platforms.',
                solution: 'By developing a modular illustration system with animation principles in mind, we created versatile assets that maintained consistency across all touchpoints.',
                tags: ['Illustration', 'Animation'],
                image: 'assets/images/placeholder-project3.jpg'
            }
        };
        
        // Verificar se o projeto existe
        if (projects[projectId]) {
            const project = projects[projectId];
            
            // Atualizar os elementos da página com os dados do projeto
            const titleElement = document.querySelector('.project-detail-title');
            const imageElement = document.querySelector('.project-detail-image');
            const descriptionElement = document.querySelector('.project-detail-description');
            const tagsElement = document.querySelector('.project-detail-tags');
            const challengeElement = document.querySelector('.project-detail-content h2:nth-of-type(1) + p');
            const solutionElement = document.querySelector('.project-detail-content h2:nth-of-type(2) + p');
            
            if (titleElement) titleElement.textContent = project.title;
            if (imageElement && project.image) {
                const img = document.createElement('img');
                img.src = project.image;
                img.alt = project.title;
                imageElement.appendChild(img);
            }
            
            if (descriptionElement) {
                // Criar parágrafos a partir da descrição
                const descriptionParagraphs = project.description.split('. ');
                descriptionElement.innerHTML = '';
                
                descriptionParagraphs.forEach((paragraph, index) => {
                    if (index < descriptionParagraphs.length - 1 && !paragraph.endsWith('.')) {
                        paragraph += '.';
                    }
                    const p = document.createElement('p');
                    p.textContent = paragraph;
                    descriptionElement.appendChild(p);
                });
            }
            
            if (tagsElement) {
                tagsElement.innerHTML = '';
                project.tags.forEach(tag => {
                    const tagSpan = document.createElement('span');
                    tagSpan.className = 'tag';
                    tagSpan.textContent = tag;
                    tagsElement.appendChild(tagSpan);
                });
            }
            
            if (challengeElement) challengeElement.textContent = project.challenge;
            if (solutionElement) solutionElement.textContent = project.solution;
            
            // Atualizar navegação
            updateProjectNavigation(projectId, Object.keys(projects));
        }
    }
}

// Função para atualizar a navegação entre projetos
function updateProjectNavigation(currentProjectId, allProjectIds) {
    const prevLink = document.querySelector('.prev-project');
    const nextLink = document.querySelector('.next-project');
    
    if (prevLink && nextLink) {
        const currentIndex = allProjectIds.indexOf(currentProjectId);
        
        // Projeto anterior
        if (currentIndex > 0) {
            const prevProjectId = allProjectIds[currentIndex - 1];
            prevLink.href = `projects.html?id=${prevProjectId}`;
            prevLink.textContent = 'Previous Project';
        } else {
            // Se for o primeiro projeto, link para o último
            const prevProjectId = allProjectIds[allProjectIds.length - 1];
            prevLink.href = `projects.html?id=${prevProjectId}`;
            prevLink.textContent = 'Previous Project';
        }
        
        // Próximo projeto
        if (currentIndex < allProjectIds.length - 1) {
            const nextProjectId = allProjectIds[currentIndex + 1];
            nextLink.href = `projects.html?id=${nextProjectId}`;
            nextLink.textContent = 'Next Project';
        } else {
            // Se for o último projeto, link para o primeiro
            const nextProjectId = allProjectIds[0];
            nextLink.href = `projects.html?id=${nextProjectId}`;
            nextLink.textContent = 'Next Project';
        }
    }
}
