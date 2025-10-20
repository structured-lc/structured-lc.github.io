### Leetcode 1776 (Hard): Car Fleet II [Practice](https://leetcode.com/problems/car-fleet-ii)

### Description  
Given a list of cars, where each car \(i\) has a position and a speed, all traveling in the same direction on a one-lane road (with cars in ascending order of position), determine for each car the time it will collide with the next car in front of it. After a collision, the colliding cars form a fleet that moves with the slowest speed among merged cars. For each car, return the time it takes to collide with the next car or -1 if it never collides. Answers must be within 1e-5 of the correct value.

### Examples  

**Example 1:**  
Input: `cars = [[1,2],[2,1],[4,3],[7,2]]`  
Output: `[1.00000,-1.00000,3.00000,-1.00000]`  
*Explanation:*
- Car 0 (1,2) will hit car 1 (2,1) in (2-1)/(2-1)=1s.  
- Car 1 never catches up to anyone (it's slower).  
- Car 2 (4,3) will hit car 3 (7,2) in (7-4)/(3-2)=3s.  
- Car 3 never catches anyone.

**Example 2:**  
Input: `cars = [[3,4],[6,2],[7,1]]`  
Output: `[-1.00000,1.00000,-1.00000]`  
*Explanation:*
- Car 0 (3,4) is fastest, no car in front can be caught (all are slower).  
- Car 1 (6,2) will collide into car 2 (7,1) in (7-6)/(2-1)=1s.  
- Car 2 never catches anyone.

**Example 3:**  
Input: `cars = [[0,2],[4,2],[8,2],[12,2]]`  
Output: `[-1.00000,-1.00000,-1.00000,-1.00000]`  
*Explanation:*
All cars travel at the same speed, so none will ever collide.

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea**:  
  For each car, simulate its movement and check when and if it will meet the car in front. This would involve, for each car, comparing against every car ahead, which leads to O(n²) time, not efficient enough for large n.

- **Optimization**:  
  Since a car can only collide with the next slowest fleet ahead, and merged fleets always move at the slowest speed, we can process cars from right to left, maintaining a **monotonic stack** of potential collision targets.  
  For each car, compute the time to catch up with the current stack-top, but skip cars that this car would never catch (because that car is faster or any collision would happen after the front car already merged).  
  If a car would merge with a fleet (due to previous collisions), we must ensure our computed collision time is before that fleet's next collision.  
  This makes a single pass with stack operations: O(n).

### Corner cases to consider  
- All cars have the same speed (never collide).
- Car behind is slower or equal speed (never collide).
- Some cars never collide because their next car in front merges before they could reach it.
- Only one car (always outputs -1).
- Floating point comparison (precision within 1e-5).
- Large input size, so O(n^2) is unacceptable.

### Solution

```python
from typing import List

def getCollisionTimes(cars: List[List[int]]) -> List[float]:
    n = len(cars)
    ans = [-1.0] * n
    stack = []  # stack holds indices of potential collision targets
    
    for i in range(n - 1, -1, -1):
        pos_i, speed_i = cars[i][0], cars[i][1]
        
        # Remove impossible or "too slow to catch" targets
        while stack:
            j = stack[-1]
            pos_j, speed_j = cars[j][0], cars[j][1]
            
            # If car i is slower or at same speed than fleet at stack-top, it can't catch up
            if speed_i <= speed_j:
                stack.pop()
                continue
            
            # Compute time to catch up to car j
            t = (pos_j - pos_i) / (speed_i - speed_j)
            
            # If car j is going to collide with someone else *before* t, pop it (can't catch original j)
            if ans[j] > 0 and t >= ans[j] - 1e-8:
                stack.pop()
            else:
                break  # t is valid

        if stack:
            j = stack[-1]
            pos_j, speed_j = cars[j][0], cars[j][1]
            ans[i] = (pos_j - pos_i) / (speed_i - speed_j)
            
        # Current car can be a fleet for left cars
        stack.append(i)

    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n).  
  Each car is pushed and popped at most once from the stack. At every iteration we either pop or proceed, so doesn't exceed 2n operations overall.
- **Space Complexity:** O(n).  
  The stack is at most size n, and ans array is length n.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle cases where positions are not sorted?
  *Hint: Would need to first sort the cars by position and then remap answers to original indices.*

- What if you want to simulate the actual merging process and return the sequence of fleets and their composition?
  *Hint: Need to keep track of each fleet’s constituent cars, possibly with extra data structures.*

- Can you solve the problem without using floating point arithmetic for better precision?
  *Hint: Use fractions module or store numerators/denominators separately where possible.*

### Summary
The key idea is to process cars from the back, using a **monotonic stack** to track which cars (or fleets) can potentially be collided with, and efficiently skip those that can't be reached due to speed or earlier collisions. This pattern is similar to **monotonic stack** problems (e.g., Next Greater Element) and often applies where you need to compute non-overlapping sequential events in linear time.


### Flashcard
For Car Fleet II, process cars from right to left using a monotonic stack to efficiently track potential collisions and merged fleets.

### Tags
Array(#array), Math(#math), Stack(#stack), Heap (Priority Queue)(#heap-priority-queue), Monotonic Stack(#monotonic-stack)

### Similar Problems
- Car Fleet(car-fleet) (Medium)
- Count Collisions on a Road(count-collisions-on-a-road) (Medium)