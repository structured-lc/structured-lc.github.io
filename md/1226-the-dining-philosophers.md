### Leetcode 1226 (Medium): The Dining Philosophers [Practice](https://leetcode.com/problems/the-dining-philosophers)

### Description  
The Dining Philosophers problem is a classic concurrency challenge.  
Imagine 5 philosophers seated around a circular table, with one fork placed between each pair.  
Philosophers alternate between *thinking* and *eating*.  
To eat, a philosopher must pick up both the left and right forks. However, since forks are shared, we must coordinate pickups such that:
- No two adjacent philosophers eat at the same time (mutual exclusion).
- No situation arises where every philosopher grabs one fork, causing deadlock and preventing all from eating.
- No philosopher starves (always eventually gets a chance to eat).

You are to implement a system where each philosopher calls a function when they wish to eat, and:
- Picks up left fork.
- Picks up right fork.
- Eats.
- Puts down left fork.
- Puts down right fork.

This must be done for many parallel calls, ensuring no deadlock or starvation.

### Examples  

**Example 1:**  
Input: `Five philosophers all try to eat at once`  
Output: `All take turns eating without deadlock or starvation`  
*Explanation: Even if all start at the same time, the implementation must ensure only eligible philosophers pick up forks, so all eventually eat one after the other.*

**Example 2:**  
Input: `Philosopher 0 and 2 try to eat at the same time`  
Output: `Both can eat simultaneously (since they do not share a fork)`  
*Explanation: Non-neighboring philosophers can eat in parallel.*

**Example 3:**  
Input: `Each philosopher starts eating after a random delay`  
Output: `No deadlock or starvation occurs`  
*Explanation: Implementation ensures fairness despite unpredictable timing.*

### Thought Process (as if you’re the interviewee)  
This is a classic resource allocation problem with shared resources (forks) and potential for deadlock.  
**Brute force idea:** Use a lock for each fork. Philosophers pick up left and right forks by acquiring locks.  
**Issue:** If all philosophers pick up their left fork at the same time, no one can get both forks—deadlock.

**Possible optimizations:**
- Limit the number of philosophers who can try to eat at the same time (e.g., at most 4 out of 5).
- Enforce an order: philosophers with even index pick up left fork then right, odd index pick up right fork then left.
- Use a global mutex or semaphore to control fork access, or ensure atomic fork acquisition.

**Chosen approach:** Use a lock for each fork **plus** a global mutex to limit the number of concurrent eaters to 4.  
This breaks the cycle causing deadlock because at least one philosopher will always be able to get both forks and proceed.

### Corner cases to consider  
- All philosophers try to eat simultaneously.
- Philosophers think and eat at different/random times.
- Only one philosopher (edge case).
- Repeated eating cycles (indefinite running).
- Ensure no philosopher starves if their neighbors are slow to release forks.

### Solution

```python
from threading import Lock, Semaphore

class DiningPhilosophers:
    def __init__(self):
        # One lock (fork) between every two philosophers
        self.forks = [Lock() for _ in range(5)]
        # Semaphore to allow max 4 philosophers to try to eat at once
        self.room = Semaphore(4)  # prevents deadlock

    def wantsToEat(self, 
                   philosopher: int, 
                   pickLeftFork: 'Callable[[], None]',
                   pickRightFork: 'Callable[[], None]',
                   eat: 'Callable[[], None]',
                   putLeftFork: 'Callable[[], None]', 
                   putRightFork: 'Callable[[], None]') -> None:
        # Enter the room - only 4 at a time
        self.room.acquire()
        
        left = philosopher
        right = (philosopher + 1) % 5
        
        # Acquire lower-indexed fork first to avoid deadlock (optional improvement)
        first, second = (left, right) if left < right else (right, left)
        
        self.forks[first].acquire()
        self.forks[second].acquire()
        
        # Pick up left and right forks
        pickLeftFork()
        pickRightFork()
        
        # Eat
        eat()
        
        # Put down left and right forks
        putLeftFork()
        putRightFork()
        
        # Release the forks
        self.forks[second].release()
        self.forks[first].release()
        
        # Leave the room
        self.room.release()
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1) per philosopher's action (lock/unlock and function calls), since fork and semaphore operations are constant time.
- **Space Complexity:** O(1) extra space (just 5 fork locks, plus a semaphore, not dependent on usage patterns).

### Potential follow-up questions (as if you’re the interviewer)  

- What if there are *n* philosophers instead of 5?  
  *Hint: Generalize your locking and semaphore strategy for arbitrary n.*

- Can you solve the problem without any global resource like a semaphore?  
  *Hint: Try enforcing order in fork acquisition, or design using only fork locks.*

- How would you ensure fairness so no philosopher starves over repeated calls?  
  *Hint: Consider tracking last-eaten times or using fairness-enabled locks/semaphores.*

### Summary
This problem is a classic application of thread synchronization and deadlock avoidance.  
The combination of per-resource (fork) locks and a global semaphore cleanly prevents cycles for deadlock.  
This pattern is widely used for managing shared resources safely in concurrent programming and is foundational for operating system and multithreaded application design.