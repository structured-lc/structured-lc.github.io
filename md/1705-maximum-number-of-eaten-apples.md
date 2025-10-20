### Leetcode 1705 (Medium): Maximum Number of Eaten Apples [Practice](https://leetcode.com/problems/maximum-number-of-eaten-apples)

### Description  
Given two integer arrays, **apples** and **days**, both of length n, representing an apple tree's production and apple lifespan over n days:
- On day i, the tree grows apples[i] apples. Each apple will rot and become inedible after days[i] days (i.e., will expire at the end of day i + days[i] - 1).
- You can eat at most **one apple per day**; you may continue eating after the nᵗʰ day if apples remain unspoiled.
- The objective is to determine the **maximum number of apples you can eat** assuming you always eat the apple that will rot the soonest.

### Examples  

**Example 1:**  
Input: `apples = [1,2,3,5,2]`, `days = [3,2,1,4,2]`  
Output: `7`  
*Explanation:*
- Day 0: 1 apple (exp: day 2); eat it. (Total: 1)
- Day 1: 2 apples (exp: day 2); eat 1 (prefer older). (Total: 2)
- Day 2: 3 apples (exp: day 2) but all prior apples expire today; eat 1 (Total: 3)
- Day 3: 5 apples (exp: day 6); eat 1 each day until day 6 (except days when no apples left); total 4 apples.
- Day 4: 2 apples (exp: day 5); eat when possible before expiration.
- Grand total eaten: 7 apples.

**Example 2:**  
Input: `apples = [3,0,0,0,0,2]`, `days = [3,0,0,0,0,2]`  
Output: `5`  
*Explanation:*
- Day 0: 3 apples (exp: day 2). Eat days 0,1,2.
- Day 5: 2 apples (exp: day 6). Eat on days 5 and 6.
- Total apples eaten: 3 + 2 = 5.

**Example 3:**  
Input: `apples = [0,0,0]`, `days = [0,0,0]`  
Output: `0`  
*Explanation:*
- No apples grow at all.

### Thought Process (as if you’re the interviewee)  
First thought:  
- Try to eat one apple each day from any available apples that are not yet rotten.
- The brute-force approach would check all apples every day and always pick one that hasn't expired, but this is inefficient.

Better idea:
- Since each apple batch has an expiration date, always eat an apple that will expire soonest ("greedy").
- Use a **min-heap** (priority queue) to efficiently track the soonest expiring apples: each entry is a tuple (expire_date, apples_left).
- Each day:
  - Add today's apples (if any) to the heap with their expiration date.
  - Remove from the heap any expired apples (expire_date < today).
  - Eat one apple from the apple batch that will expire soonest (pop from heap, decrease count, re-add if apples left).

Finish the process even after n days, until all apples have either been eaten or have rotten.

Why min-heap? Eating the soonest-to-expire apple each time maximizes usable apples and prevents wastage; heap guarantees efficient retrieval/deletion.

### Corner cases to consider  
- **Empty arrays**: apples = [], days = [] → should return 0.
- **All zeros**: apples = [0,0,...], days = [0,0,...] → 0 apples grown.
- **Apples with zero lifespan**: days[i] == 0.
- **Single apple batch with long shelf life:** one input apple but lives for many days.
- **Gaps:** days where apples do not grow at all.
- **Very short-lived apples:** e.g., apples[i] > 0 but days[i] == 1.
- **Apples expiring on the same day from different batches.

### Solution

```python
import heapq

def eatenApples(apples, days):
    # min-heap where each entry is (expire_day, apples_left)
    # expire_day is the absolute day-count when apple batch will rot
    heap = []
    n = len(apples)
    res = 0
    day = 0
    
    while day < n or heap:
        # If new apples are grown today, add them to heap
        if day < n and apples[day] > 0:
            # Date of expiry: today + days[day] - 1
            heapq.heappush(heap, (day + days[day] - 1, apples[day]))
        # Remove any apples that are already rotten (expiry < today) or 0 left
        while heap and (heap[0][0] < day or heap[0][1] == 0):
            heapq.heappop(heap)
        # Eat one apple from earliest expiry batch
        if heap:
            soonest_expiry, num_apples = heapq.heappop(heap)
            res += 1
            if num_apples > 1:
                heapq.heappush(heap, (soonest_expiry, num_apples - 1))
        day += 1
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × log n), since each apple batch can be pushed/popped from heap up to days[i] times, and the heap stores up to n elements.
- **Space Complexity:** O(n), because in the worst case you may have one heap entry for every apple batch that hasn't expired.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle if you could eat **k** apples per day?
  *Hint: Generalize the number eaten per day, maybe process all batches k times if available.*

- What happens if the apples array is huge and memory is constrained?
  *Hint: Discuss ways to process in chunks or streams, or ways to optimize in-place.*

- How would you adapt if apple expiry dates are not strict (e.g., can eat the day after expiry with a penalty)?
  *Hint: Design a system to record penalties, or build logic for delayed consumption.*

### Summary
This problem uses the **heap + greedy** pattern, where elements are processed in order of the next critical event, here the sooner rotten date. The solution efficiently always selects the most "urgent" item using a min-heap. This template is often seen in job scheduling with deadlines, inventory decay, or anytime "pick soonest to expire" is required.


### Flashcard
Use a min-heap to always eat the apple batch expiring soonest; remove expired batches daily and count eaten apples.

### Tags
Array(#array), Greedy(#greedy), Heap (Priority Queue)(#heap-priority-queue)

### Similar Problems
