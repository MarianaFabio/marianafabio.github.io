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
    
    // Inicializar projetos dinâmicos (se houver)
    initProjectPage();
});

// Função para inicializar a página de detalhes do projeto
function initProjectPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('id');
    
    if (projectId && window.location.pathname.includes('projects.html')) {
        // Aqui você pode carregar dinamicamente os detalhes do projeto
        // Este é um exemplo simples - em uma implementação real você usaria dados reais
        
        // Exemplo: poderia buscar dados de um JSON ou definir manualmente por projeto
        const projects = {
            'projeto1': {
                title: 'Nome do Projeto 1',
                description: 'Descrição detalhada do projeto 1...',
                tags: ['Design de UI', 'Branding'],
                image: 'assets/images/placeholder-project1.jpg'
            },
            'projeto2': {
                title: 'Nome do Projeto 2',
                description: 'Descrição detalhada do projeto 2...',
                tags: ['Design de Produto', 'UX Research'],
                image: 'assets/images/placeholder-project2.jpg'
            }
            // Adicione mais projetos conforme necessário
        };
        
        // Verificar se o projeto existe
        if (projects[projectId]) {
            const project = projects[projectId];
            
            // Atualizar os elementos da página com os dados do projeto
            const titleElement = document.querySelector('.project-detail-title');
            const imageElement = document.querySelector('.project-detail-image');
            const descriptionElement = document.querySelector('.project-detail-description');
            const tagsElement = document.querySelector('.project-detail-tags');
            
            if (titleElement) titleElement.textContent = project.title;
            if (imageElement) imageElement.src = project.image;
            if (descriptionElement) descriptionElement.textContent = project.description;
            
            if (tagsElement) {
                tagsElement.innerHTML = '';
                project.tags.forEach(tag => {
                    const tagSpan = document.createElement('span');
                    tagSpan.className = 'tag';
                    tagSpan.textContent = tag;
                    tagsElement.appendChild(tagSpan);
                });
            }
        }
    }
}
