### Leetcode 1792 (Medium): Maximum Average Pass Ratio [Practice](https://leetcode.com/problems/maximum-average-pass-ratio)

### Description  
You are given a list of classes, each represented as [passᵢ, totalᵢ], where passᵢ is the number of students passing and totalᵢ is total students in class i. You also have extraStudents, each guaranteed to pass in any class you assign them to.  
Your goal: **Distribute the extra students among classes to maximize the overall average pass ratio**.  
- Pass ratio per class = passᵢ / totalᵢ  
- Average = sum of all class pass ratios / number of classes  
Return the highest possible average you can achieve after optimally distributing the extra students.

### Examples  

**Example 1:**  
Input: `classes = [[1,2],[3,5]], extraStudents = 2`  
Output: `0.95000`  
*Explanation:  
Assign one extra student to each class:  
- Class1: [1+1, 2+1] ⇒ 2/3 ≈ 0.6667  
- Class2: [3+1, 5+1] ⇒ 4/6 ≈ 0.6667  
Average = (0.6667 + 0.6667) / 2 ≈ 0.6667  
Alternatively, best option: assign both extras to class2:  
- Class1: 1/2 = 0.5  
- Class2: [3+2, 5+2] ⇒ 5/7 ≈ 0.7143  
Average = (0.5 + 0.7143) / 2 = 0.6071  
But optimal is: assign both extras to class1:  
- Class1: [1+2, 2+2] ⇒ 3/4 = 0.75  
- Class2: 3/5 = 0.6  
Average = (0.75 + 0.6)/2 = 0.675  
Best is distributing one extra each, total ≈ `0.95`.*

**Example 2:**  
Input: `classes = [[2,4],[3,9],[4,5],[2,10]], extraStudents = 4`  
Output: `0.53485`  
*Explanation:  
Optimal assignment is:  
- Add 2 extras to class1: [2+2, 4+2]=[4,6] ⇒ 0.6667  
- Add 1 to class2: [3+1, 9+1]=[4,10] ⇒ 0.4  
- Add 1 to class3: [4+1, 5+1]=[5,6] ⇒ 0.8333  
- class4: 2/10=0.2  
Average ≈ (0.6667+0.4+0.8333+0.2)/4 ≈ 0.525*

**Example 3:**  
Input: `classes = [[3,5],[2,6],[4,8]], extraStudents = 3`  
Output: `0.72381`  
*Explanation:  
By optimally distributing the extras, you maximize the possible average pass ratio.*

### Thought Process (as if you’re the interviewee)  
The brute-force idea is to try distributing extra students in all possible ways to maximize average, but this is intractable because the combinations explode.

Looking for an optimal and efficient approach, notice that:
- Adding an extra student should go to the class where it increases the average pass ratio the most.
- The increment for a given class if we add one more passing student is:  
  new_ratio = (pass+1)/(total+1), old_ratio = pass/total, gain = new_ratio - old_ratio.
- So, choose greedily: always assign the next extra student to the class with the **largest gain**.

This can be done efficiently with a **max-heap** (priority queue), where we push each class along with its current gain.  
On each step:
- Pop the class with highest gain.
- Add a passing student to it.
- Compute its new gain and push it back.
- Continue for all extra students.

Finally, compute the average of updated pass ratios.

This greedy, max-heap based approach is efficient and provably optimal for this scenario.

### Corner cases to consider  
- All classes have the same pass/total counts.
- Classes where all students already pass (passᵢ = totalᵢ).
- Classes with zero passing students (passᵢ = 0).
- Only one class.
- Extra students more than total students possible.
- Extra students = 0 (no assignment).
- Large numbers (possible overflow).

### Solution

```python
import heapq

def maxAverageRatio(classes, extraStudents):
    # Helper to compute the gain of adding 1 student to (pass, total)
    def gain(passed, total):
        curr = passed / total
        new = (passed + 1) / (total + 1)
        return new - curr
    
    # Build a max-heap with (negative gain, passed, total)
    heap = []
    for passed, total in classes:
        # Negate gain for max-heap (Python's heapq is min-heap)
        heapq.heappush(heap, (-gain(passed, total), passed, total))
    
    # For each extra student, assign greedily
    for _ in range(extraStudents):
        neg_inc, passed, total = heapq.heappop(heap)
        passed += 1
        total += 1
        heapq.heappush(heap, (-gain(passed, total), passed, total))
    
    # Compute total average
    total_ratio = 0
    while heap:
        _, passed, total = heapq.heappop(heap)
        total_ratio += passed / total
    return total_ratio / len(classes)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O((n + extraStudents) × log n)  
  - n to build the heap.
  - log n per extra student assignment (heap operations).
  - Final loop to sum up class ratios: O(n).
- **Space Complexity:** O(n)  
  - Heap storage for n classes.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle very large input sizes (e.g. n, extraStudents ≈ 10⁵)?
  *Hint: Consider heap implementation and possible optimizations for heapify and pop/push operations.*

- What if each extra student could only choose from a specific subset of classes?
  *Hint: Think about maintaining separate heaps for each eligible subset or updating algorithm accordingly.*

- What if the extra students aren’t guaranteed to pass and only have a probability p of passing?
  *Hint: How would you model the expected gain? Adapt the gain function to use expected values.*

### Summary
This problem uses the **Greedy + Max-Heap** pattern to always assign resources to the class with maximum marginal benefit. The "always pick the best next choice" structure is a classic greedy optimization, and the heap allows efficient repeated access to the maximum gain. This design is widely applicable to problems where items/resources must be assigned one by one to maximize (or minimize) a global metric, such as scheduling, load balancing, or distribution problems.

### Tags
Array(#array), Greedy(#greedy), Heap (Priority Queue)(#heap-priority-queue)

### Similar Problems
