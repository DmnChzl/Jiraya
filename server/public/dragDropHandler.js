const dragDropHandler = () => {
  let draggedElement = null;
  let draggedTaskId = null;

  document.addEventListener('dragstart', (event) => {
    const target = event.target.closest('[data-task-id]');
    if (!target) return;

    draggedElement = target;
    draggedTaskId = target.getAttribute('data-task-id');

    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = 'move';
    }
  });

  document.addEventListener('dragend', () => {
    draggedElement = null;
    draggedTaskId = null;
  });

  document.addEventListener('dragover', (event) => {
    event.preventDefault();

    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = 'move';
    }
  });

  document.addEventListener('drop', (event) => {
    event.preventDefault();

    const dropZone = event.target.closest('[data-droppable="true"]');
    if (!dropZone || !draggedTaskId) return;

    const stageId = dropZone.getAttribute('data-stage-id');
    if (!stageId || !draggedElement) return;

    /*
    fetch(`/api/tasks/${draggedTaskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        stageId
      })
    }).then((response) => {
      const triggerHeader = response.headers.get('HX-Trigger');
      if (triggerHeader) {
        htmx.trigger(document.body, triggerHeader);
      }
    });
    */

    htmx.ajax('PUT', `/api/tasks/${draggedTaskId}`, {
      target: 'body',
      values: {
        stageId
      },
      swap: 'none'
    });
  });
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', dragDropHandler);
} else {
  dragDropHandler();
}
