import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Child } from '../types/child';

export const useTimerStore = defineStore('timer', () => {
  const children = ref<Child.Created[]>([]);
  const timerIntervals = ref<Record<string, number>>({});

  function saveState() {
    localStorage.setItem('children', JSON.stringify(children.value));
    localStorage.setItem('timerIntervals', JSON.stringify(timerIntervals.value));
  }

  function loadState() {
    const savedChildren = localStorage.getItem('children');
    const savedTimerIntervals = localStorage.getItem('timerIntervals');

    if (savedChildren) {
      children.value = JSON.parse(savedChildren);
    }

    if (savedTimerIntervals) {
      const intervals = JSON.parse(savedTimerIntervals);
      for (const childId in intervals) {
        const remainingTime = intervals[childId];
        if (remainingTime > 0) {
          counter(childId, remainingTime / 60);
        }
      }
    }
  }

  function counter(childId: string, time: number) {
    let totalSeconds = time * 60;
    timerIntervals.value[childId] = totalSeconds;

    const intervalId = setInterval(() => {
      if (totalSeconds-- <= 0) {
        clearInterval(intervalId);
        delete timerIntervals.value[childId];
        saveState();
        return;
      }

      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;
      const child = children.value.find(child => child.id === childId);
      if (child) {
        child.timer = `${minutes}:${seconds.toString().padStart(2, '0')}`;
      }

      timerIntervals.value[childId] = totalSeconds;
      saveState();
    }, 1000);
  }

  function addChild(newChild: Child.Created) {
    children.value.push(newChild);
    counter(newChild.id, newChild.totalMinutes);
    saveState();
  }

  function setChildren(newChildren: Child.Created[]) {
    children.value = newChildren;
    saveState();
  }

  // Load state from localStorage when the store is initialized
  loadState();

  return {
    children,
    addChild,
    setChildren,
    counter,
  };
});
