document.addEventListener('DOMContentLoaded', () => {
    // Smooth Scrolling for Navigation
    document.querySelectorAll('nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });

    // Contact Form Submission
    document.querySelector('form').addEventListener('submit', async function (e) {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);

        const response = await fetch(form.action, {
            method: form.method,
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            form.reset();
            alert('Thank you for your message!');
        } else {
            alert('There was a problem submitting your form. Please try again.');
        }
    });

    // Dynamic Project Loading
    fetch('projects.json') // Replace with your JSON file path
        .then(response => response.json())
        .then(projects => {
            const projectsContainer = document.querySelector('#projects .container');
            projects.forEach(project => {
                const projectElement = document.createElement('div');
                projectElement.classList.add('project');
                projectElement.innerHTML = `
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <p><strong>Technologies used:</strong> ${project.technologies.join(', ')}</p>
                    <a href="${project.liveDemo}" target="_blank">Live Demo</a>
                    <a href="${project.githubRepo}" target="_blank">GitHub Repo</a>
                `;
                projectsContainer.appendChild(projectElement);
            });
        })
        .catch(error => console.error('Error loading projects:', error));
});


