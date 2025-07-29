### Leetcode 358 (Hard): Rearrange String k Distance Apart [Practice](https://leetcode.com/problems/rearrange-string-k-distance-apart)

### Description  
Given a string `s` and an integer `k`, rearrange the characters in `s` so that the same characters are at least distance `k` from each other. If it is not possible to do so, return an empty string.

You must ensure that for any two identical characters, the gap between their positions in the result is at least `k`. If you cannot rearrange to meet this requirement, return `""`.  
For example, with `s = "aabbcc"` and `k = 3`, one correct result would be `"abcabc"`, since no two equal characters are within three positions of each other.

### Examples  

**Example 1:**  
Input: `s = "aabbcc", k = 3`  
Output: `"abcabc"`  
Explanation: Build the result step-by-step, always picking a different character (a, b, c) and cycling back. All same letters are at least 3 apart.

**Example 2:**  
Input: `s = "aaabc", k = 3`  
Output: `""`  
Explanation: Three 'a's cannot be placed at least 3 apart since there are not enough other characters to fill the gap.

**Example 3:**  
Input: `s = "aaadbbcc", k = 2`  
Output: `"abacabcd"`  
Explanation: 'a's are at least 2 apart; one possible answer (other valid answers possible: `"abcabcda"`, etc).

### Thought Process (as if you’re the interviewee)  
- **Brute Force:** Try every permutation of the string, check if each is valid. This is clearly infeasible (\(n!\)), even for moderate `n`.
- **Observation:** The highest-frequency characters are the biggest constraint—if any appear so often that you can't keep them `k` apart, the result is impossible.
- **Greedy + Heap:**  
  - Always pick the character that remains most frequent (so later picks do not get "trapped").  
  - Use a max heap (priority queue) to track character counts.  
  - To enforce distance `k`, after choosing a character, wait for `k` turns before it can re-enter the heap (store in a queue with countdown).
- **Implementation:**  
  - Count the frequency of each char.
  - Use a heap to always pick the "most available" character.
  - Use a waiting queue to manage "cooldown" for each character (store (char, count, ready tick)).
  - If at some step heap is empty but queue not yet done with `k-1` chars, the answer is impossible.

This approach is efficient and fits well for the constraints.

### Corner cases to consider  
- Empty string: `s = ""`
- k = 0 or k = 1 (no restrictions: any ordering is valid)
- String with only one kind of character, but not enough diversity to separate  
- High frequency character exceeds possible placements (like `"aaaabb"`, k = 3)
- String length less than k: impossible if duplicate letters
- All characters unique
- All characters the same


### Solution

```python
import heapq
from collections import Counter, deque

def rearrangeString(s, k):
    if k <= 1:
        # No restriction needed
        return s

    # Count character frequencies
    freq = Counter(s)
    # Max heap: (-count, char)
    max_heap = [(-cnt, ch) for ch, cnt in freq.items()]
    heapq.heapify(max_heap)
    queue = deque()  # Elements are (count, char, ready_tick)
    res = []

    while max_heap or queue:
        if not max_heap:
            # Can't proceed, stuck waiting for cooldown
            return ""
        cnt, ch = heapq.heappop(max_heap)
        res.append(ch)
        # Prepare to re-enter after cooldown
        queue.append((cnt + 1, ch))  # decrease count

        if len(queue) >= k:
            # Character at cooldown front is eligible
            ready_cnt, ready_ch = queue.popleft()
            if -ready_cnt > 0:
                heapq.heappush(max_heap, (ready_cnt, ready_ch))

    return "".join(res) if len(res) == len(s) else ""
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log c), where n = len(s), c = number of unique characters. Each of up to n pushes and pops entries from the heap which has size at most c.
- **Space Complexity:** O(n), for output and queue storage; O(c) for heap and frequency table.

### Potential follow-up questions (as if you’re the interviewer)  

- What if k is very large, close to or larger than n?  
  *Hint: Consider if it's ever possible except for all unique characters.*

- Can you do it without extra O(c) space?  
  *Hint: Try in-place, or see if the frequency table is strictly necessary.*

- What about Unicode, case sensitivity, or string with non-lowercase letters?  
  *Hint: Character set generalization.*

### Summary
This problem uses the **Greedy with Heap/Queue** pattern for scheduling under separation constraints.  
It is a variant of interval (cooldown) task scheduling, rebalancing, or the "Least Recently Used" discipline, often seen in job/task schedulers, exam proctoring, or any scenario with "separation" and "frequency" constraints.