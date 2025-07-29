### Leetcode 3092 (Medium): Most Frequent IDs [Practice](https://leetcode.com/problems/most-frequent-ids)

### Description  
Given two arrays, **nums** and **freq**, each of length *n*, where *nums[i]* is an ID and *freq[i]* represents the increment or decrement to the frequency of that ID at step *i*:  
At each step *i*, update the frequency count of *nums[i]* by *freq[i]* (can be negative).  
After each update, output the **maximum frequency** among all IDs at that moment.  
If all frequencies are 0 or negative (meaning no items are present), return 0 for that step.  
The answer is an array of length *n* where answer[i] = max frequency after processing step *i*.

### Examples  

**Example 1:**  
Input: `nums = [2,3,2,3], freq = [3,2,-3,2]`  
Output: `[3,3,2,2]`  
*Explanation:  
Step 0: Add 3 to id 2 → freq = {2:3}, max = 3  
Step 1: Add 2 to id 3 → freq = {2:3, 3:2}, max = 3  
Step 2: Add -3 to id 2 → freq = {2:0, 3:2}, max = 2  
Step 3: Add 2 to id 3 → freq = {2:0, 3:4}, max = 4  
But after step 2, 3's freq is 2. After last, it is 4, so the correct output should be `[3,3,2,4]`.*

**Example 2:**  
Input: `nums = [1,1,2,2,1], freq = [2,-1,3,-3,1]`  
Output: `[2,1,3,0,1]`  
*Explanation:  
Step 0: Add 2 to id 1 → freq = {1:2}, max = 2  
Step 1: Add -1 to id 1 → freq = {1:1}, max = 1  
Step 2: Add 3 to id 2 → freq = {1:1, 2:3}, max = 3  
Step 3: Add -3 to id 2 → freq = {1:1, 2:0}, max = 1  
Step 4: Add 1 to id 1 → freq = {1:2, 2:0}, max = 2  
But at step 3, both are ≤0 so max is 1 not 0. Correction: at step 3, max of frequencies ≥0 is 1 (since 1's freq is 1). At step 4, it becomes 2. Output: `[2,1,3,1,2]`.*

**Example 3:**  
Input: `nums = [5], freq = [4]`  
Output: `[4]`  
*Explanation:  
Only one step: Add 4 to id 5 → freq = {5:4}, max = 4.*

### Thought Process (as if you’re the interviewee)  

First, I need to repeatedly update frequencies and find the current maximum after each operation.  
- **Brute-force:** After each update, loop over the map/dictionary to find the maximum current freq. But that's O(n²) total, too slow.
- **Optimization:** Maintain a hashmap `cnt` for frequencies of each id, and another data structure to quickly get the current max.
- Priority queues (heapq) do max efficiently, but removing elements is tricky.
- Solution: Every time a freq updates, push the new freq to a **max-heap**.  
  But old values remain in the heap after updates, so we need a "lazy removal" strategy:  
  - When increasing/decreasing a freq, track the frequency count before and after.  
  - Use an extra hashmap `lazy` that records how many times each value is “outdated” and should be ignored during extraction.  
  When you peek at the heap top, if it's outdated (in `lazy`), pop and decrement its count in `lazy`.  
- This makes each step roughly O(log n), and gives correct real-time max after each update.

### Corner cases to consider  
- freq[i] is negative, so frequencies can drop to zero or below.
- All IDs’ frequencies drop to zero or negative (return 0 in that case, if heap is empty).
- Repeated updates on the same id.
- Only one id.
- nums or freq has length 1.
- Output should always be non-negative.
- freq[i] could be 0 (no change for that step).
- Multiple IDs may have the same max.

### Solution

```python
import heapq

def mostFrequentIDs(nums, freq):
    cnt = dict()     # counts for each id
    lazy = dict()    # lazy removal counts for values that should not be used as max
    heap = []        # max-heap (simulate with negative values)
    res = []
    for x, f in zip(nums, freq):
        pre = cnt.get(x, 0)  # previous count for nums[i]
        # Mark the old count as outdated in lazy-removal
        if pre in lazy:
            lazy[pre] += 1
        else:
            lazy[pre] = 1
        # Update the actual count for this id
        cnt[x] = pre + f
        # Push the new count to the max-heap
        heapq.heappush(heap, -cnt[x])
        # Remove outdated values from the heap top
        while heap:
            curr = -heap[0]
            if lazy.get(curr, 0) > 0:
                heapq.heappop(heap)
                lazy[curr] -= 1
            elif curr == 0:
                # If max value is 0, pop (since 0 means id not present)
                heapq.heappop(heap)
            else:
                break
        # The current maximum is either the top of the heap or 0 if heap is empty
        res.append(0 if not heap else max(0, -heap[0]))
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n), since each step may require O(log n) heap operations (push/pop, and lazy removals are amortized).
- **Space Complexity:** O(n), from maps `cnt`, `lazy`, and heap (could grow with n unique operations and IDs).

### Potential follow-up questions (as if you’re the interviewer)  

- What if you need to output the ID(s) itself (not just max count), and several IDs could tie?
  *Hint: Maintain an extra set for ids with current max.*

- How would you solve this if all frequencies must always remain ≥ 0 (never allow negative or zero frequency)?
  *Hint: Clamp freq at 0 after each step, or use Counter+heap with 0-suppression.*

- What if updates are streamed and you must support rollbacks or undo operations efficiently?
  *Hint: Use persistent data structures or stacks recording history per id.*

### Summary
This is a **dynamic frequency tracking** and **online maximum** query problem.  
Patterns:
- HashMap for counting frequencies.
- Max Heap for efficient max retrieval under dynamic modification.
- Lazy removal for outdated elements in the heap.
This technique is common when you need both *fast update* and *fast max/min retrieval with deletes*—similar to frequency-of-elements sliding window, dynamic leaderboards, or event rate tracking apps.