### Leetcode 1117 (Medium): Building H2O [Practice](https://leetcode.com/problems/building-h2o)

### Description  
This problem models the synchronization required to form water molecules (H₂O) using concurrent threads representing hydrogen (H) and oxygen (O). Each thread calls either the `hydrogen` method or the `oxygen` method. The requirement is that two hydrogens and one oxygen must "pass through the barrier" together, forming exactly one water molecule before any others can begin. No group should ever have more or less than two hydrogens and one oxygen, and all three must synchronize before their associated print actions can execute and the next group starts.

### Examples  

**Example 1:**  
Input: `HHO` (threads call: H, H, O, in that order)  
Output: `HHO`  
*Explanation: Two hydrogens and one oxygen form one molecule.*

**Example 2:**  
Input: `OOHHHH` (threads in order: O, O, H, H, H, H)  
Output: `HHOHHO`  
*Explanation: First three (O, O, H) cannot form water since each molecule must be exactly HHO. The output always comes in groups such that for every oxygen there are two hydrogens: HHOHHO.*

**Example 3:**  
Input: `HHOO` (H, H, O, O)  
Output: `HHOHHO`  
*Explanation: Two complete groups of HHO are formed in any valid order (as long as each set is kept together). Threads may interleave but every molecule is HHO.*

### Thought Process (as if you’re the interviewee)  
The problem is about synchronizing threads to ensure that two hydrogens and one oxygen execute their print actions together, matching the scientific ratio in a water molecule.  
- **Brute-force approach** would ignore synchronization, letting threads print as soon as they're called, but this would easily result in outputs like "HHOO" — invalid because that's not two complete molecules.
- The **synchronization approach** needs:  
  - A way to count hydrogens and oxygens "waiting"
  - Ensure that exactly two hydrogens and one oxygen run their release methods together
  - Block extra hydrogens or oxygens until a molecule is formed
- **Optimal approach:**
  - Use two semaphores. One controls when hydrogens can proceed (initialized to 2), and another for oxygens (initialized to 0).
  - When a hydrogen arrives, it acquires a hydrogen permit and signals oxygen.  
  - When an oxygen arrives, it waits until it has received two signals (from hydrogens), then proceeds, and releases new hydrogen permits for the next group.
  - A barrier can ensure that the three threads finish their print actions before any new molecule starts.

### Corner cases to consider  
- Input sequence with more hydrogens than oxygens (wait forever)
- Input sequence with more oxygens than hydrogens (some oxygens blocked forever)
- Multiple hydrogens or oxygens arriving in a batch before others arrive
- Threads arriving out of "natural" HHO order
- No threads at all (empty input; nothing prints)
- Only hydrogens or only oxygens (should block forever)

### Solution

```python
import threading

class H2O:
    def __init__(self):
        # Semaphores to manage access for hydrogen and oxygen threads
        self.hydrogen_semaphore = threading.Semaphore(2)
        self.oxygen_semaphore = threading.Semaphore(0)
        # Barrier to synchronize the release actions for 3 threads per group
        self.barrier = threading.Barrier(3)

    def hydrogen(self, releaseHydrogen):
        # Acquire hydrogen semaphore (2 per molecule)
        self.hydrogen_semaphore.acquire()
        # Wait for other threads to reach barrier
        self.barrier.wait()
        # Output 'H'
        releaseHydrogen()
        # Release oxygen permit after hydrogen has arrived
        self.oxygen_semaphore.release()

    def oxygen(self, releaseOxygen):
        # Wait for two hydrogens to signal (thus, get 2 oxygen sem permits)
        self.oxygen_semaphore.acquire()
        self.oxygen_semaphore.acquire()
        # Wait for the two hydrogens at barrier
        self.barrier.wait()
        # Output 'O'
        releaseOxygen()
        # Reset hydrogen semaphore for next molecule
        self.hydrogen_semaphore.release()
        self.hydrogen_semaphore.release()
```

### Time and Space complexity Analysis  

- **Time Complexity:** Each thread calls acquire/release once per molecule, so per thread it's O(1). Overall: O(n) where n = number of threads.
- **Space Complexity:** O(1) extra (small integers in semaphores and barrier); O(n) due to thread stack, but that's given by the problem setup.

### Potential follow-up questions (as if you’re the interviewer)  

- What if there are an uneven number of threads?  
  *Hint: How does your solution handle leftovers?*

- Could you solve the same with only mutex and condition variables (no semaphores/barriers)?  
  *Hint: Think about explicit counters and wait/notify.*

- If you wanted to form ammonia (NH₃) instead, how would you change your synchronization logic?  
  *Hint: Change group size and semaphore/condition counts to match ratio.*

### Summary  
This pattern is a classic example of *barrier synchronization* and *resource counting* in concurrent programming. It is broadly applicable in any scenario where a set number of resources/threads must synchronize before proceeding as a unit, such as task grouping, resource pooling, and concurrent batch processing. The use of semaphores, barriers, or condition variables to group work is a fundamental concurrency pattern.


### Flashcard
Use semaphores to count waiting H and O threads; release barrier when exactly 2H + 1O are ready, then reset counts.

### Tags
Concurrency(#concurrency)

### Similar Problems
