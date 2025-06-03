export interface AppData {
  tasks: any[];
  notes: any[];
  documents: any[];
  quickNotes: any[];
  events: any[];
  goals: any[];
  activityLog: any[];
}

class DataService {
  private storageKey = 'taskflows-data';

  private getDefaultData(): AppData {
    return {
      tasks: [],
      notes: [],
      documents: [],
      quickNotes: [],
      events: [
        {
          id: "1",
          title: "Team Standup",
          date: new Date().toISOString().split('T')[0],
          time: "10:00 AM",
          type: "meeting"
        },
        {
          id: "2", 
          title: "Client Review",
          date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
          time: "2:00 PM",
          type: "meeting"
        }
      ],
      goals: [
        {
          id: "1",
          title: "Complete project tasks",
          current: 4,
          target: 6,
          deadline: "Today"
        },
        {
          id: "2",
          title: "Review documents", 
          current: 2,
          target: 3,
          deadline: "Today"
        },
        {
          id: "3",
          title: "Team meetings",
          current: 1,
          target: 2,
          deadline: "Today"
        }
      ],
      activityLog: []
    };
  }

  getData(): AppData {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Merge with default data to ensure all properties exist
        return { ...this.getDefaultData(), ...parsed };
      }
    } catch (error) {
      console.error('Error reading data:', error);
    }
    return this.getDefaultData();
  }

  saveData(data: AppData): void {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving data:', error);
    }
  }

  addActivity(activity: { type: string; title: string; timestamp: Date }): void {
    const data = this.getData();
    data.activityLog.unshift({
      id: Date.now().toString(),
      ...activity
    });
    // Keep only last 50 activities
    data.activityLog = data.activityLog.slice(0, 50);
    this.saveData(data);
  }

  getStats() {
    const data = this.getData();
    return {
      totalTasks: data.tasks.length,
      completedTasks: data.tasks.filter(t => t.completed).length,
      totalNotes: data.notes.length,
      totalDocuments: data.documents.length,
      totalQuickNotes: data.quickNotes.length,
      totalEvents: data.events.length,
      productivity: data.tasks.length > 0 ? Math.round((data.tasks.filter(t => t.completed).length / data.tasks.length) * 100) : 0
    };
  }
}

export const dataService = new DataService();
