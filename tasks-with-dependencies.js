// Challenge: Create a class that is able to manage the creation of tasks, form dependency relationships between tasks, and render which tasks are able to be work while considering dependencies. I.e., if there is a dependency, assume that task cannot be worked. 

class DependencyGraph {
    constructor() {
        this.tasks = new Map();
        this.dependencies = new Map();
    }

    addTask(taskId) {
        if (!this.tasks.has(taskId)) {
            this.tasks.set(taskId, new Set());
        }
    }

    addDependency(taskId, dependsOnId) {
        if (!this.tasks.has(taskId) || !this.tasks.has(dependsOnId)) {
            throw new Error("One or both tasks do not exist");
        }
        if (taskId === dependsOnId) {
            throw new Error("A task cannot depend on itself");
        }
        
        if (this.isCyclic(dependsOnId, taskId)) {
            throw new Error("Adding this dependency creates a cycle");
        }

        this.tasks.get(taskId).add(dependsOnId);
        if (!this.dependencies.has(dependsOnId)) {
            this.dependencies.set(dependsOnId, new Set());
        }
        this.dependencies.get(dependsOnId).add(taskId);
    }

    removeDependency(taskId, dependsOnId) {
        if (this.tasks.has(taskId)) {
            this.tasks.get(taskId).delete(dependsOnId);
        }
        if (this.dependencies.has(dependsOnId)) {
            this.dependencies.get(dependsOnId).delete(taskId);
        }
    }

    removeTask(taskId) {
        if (this.tasks.has(taskId)) {
            // Remove all dependencies where other tasks depend on this one
            const dependentTasks = this.dependencies.get(taskId) || [];
            dependentTasks.forEach(depTask => {
                this.tasks.get(depTask).delete(taskId);
            });
            this.dependencies.delete(taskId);

            // Remove all tasks this one depends on
            const dependencies = this.tasks.get(taskId);
            dependencies.forEach(dep => {
                this.dependencies.get(dep).delete(taskId);
            });
            this.tasks.delete(taskId);
        }
    }

    getExecutableTasks() {
        return [...this.tasks.keys()].filter(taskId => this.tasks.get(taskId).size === 0);
    }

    isCyclic(currentTask, targetTask, visited = new Set()) {
        if (currentTask === targetTask) return true;
        visited.add(currentTask);

        const dependents = this.tasks.get(currentTask) || [];
        for (const dependent of dependents) {
            if (!visited.has(dependent) && this.isCyclic(dependent, targetTask, visited)) {
                return true;
            }
        }

        visited.delete(currentTask);
        return false;
    }
}


const graph = new DependencyGraph();
graph.addTask("task1");
graph.addTask("task2");
graph.addTask("task3");

graph.addDependency("task2", "task1");
graph.addDependency("task3", "task2");

console.log(graph.getExecutableTasks()); // Should return ["task1"]
graph.removeDependency("task2", "task1");
console.log(graph.getExecutableTasks()); // Should return ["task1", "task2"]
