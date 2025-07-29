### Leetcode 1405 (Medium): Longest Happy String [Practice](https://leetcode.com/problems/longest-happy-string)

### Description  
Given three integers `a`, `b`, and `c` (the counts of letters 'a', 'b', and 'c'), return the longest string possible using at most `a` 'a's, `b` 'b's, and `c` 'c's (in any order), such that no three identical letters appear consecutively. You may return any such string if multiple answers exist.

### Examples  

**Example 1:**  
Input: `a = 1, b = 1, c = 7`  
Output: `"ccaccbcc"`  
*Explanation: Using as many 'c's as possible, but never three in a row, interleaving with 'a's and 'b's.*

**Example 2:**  
Input: `a = 2, b = 2, c = 1`  
Output: `"aabbc"`  
*Explanation: Possibilities include "aabbc", "ababc", etc.; must not have more than two consecutive same letters.*

**Example 3:**  
Input: `a = 7, b = 1, c = 0`  
Output: `"aabaa"`  
*Explanation: Only 'a' and 'b', must alternate to avoid "aaa".*

### Thought Process (as if you’re the interviewee)  
- Want to greedily build the string by always picking the letter with the highest remaining count, unless it would form three identical letters in a row.
- Use a max heap for tracking letter counts, always select the largest one not forming "xxx".
- If the largest cannot be used (would repeat three in a row), pick the next largest letter, and so on.
- Continue until no more letters can be legally added.

### Corner cases to consider  
- A count is much larger than others.
- Some letter counts are zero.
- Only one letter given.
- Ties in counts.

### Solution

```python
import heapq

def longestDiverseString(a: int, b: int, c: int) -> str:
    # max-heap: (-count, letter)
    heap = []
    for cnt, ch in [(-a, 'a'), (-b, 'b'), (-c, 'c')]:
        if cnt != 0:
            heapq.heappush(heap, (cnt, ch))

    res = []
    while heap:
        cnt1, ch1 = heapq.heappop(heap)
        # If the last two are the same, try next
        if len(res) >= 2 and res[-1] == res[-2] == ch1:
            if not heap:
                break
            cnt2, ch2 = heapq.heappop(heap)
            res.append(ch2)
            cnt2 += 1  # minus -1
            if cnt2 != 0:
                heapq.heappush(heap, (cnt2, ch2))
            heapq.heappush(heap, (cnt1, ch1))
        else:
            res.append(ch1)
            cnt1 += 1
            if cnt1 != 0:
                heapq.heappush(heap, (cnt1, ch1))
    return ''.join(res)
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(a + b + c) — Each letter added at most once per count.
- **Space Complexity:** O(1) — Heap of max three items, result string output.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the constraint is "no k identical consecutive letters" for any k ≥ 2?  
  *Hint: Generalize the state check from 2 to k.*

- How would you adjust for an arbitrary input alphabet size?  
  *Hint: Use a heap with as many letters as needed, and same max selection logic.*

- How to guarantee the lexicographically largest/smallest happy string?  
  *Hint: Adjust heap logic and tie-breaker on equal counts.*

### Summary
This is a max-heap greedy implementation, always choosing the largest available letter, with local constraint checking. This pattern of heap-based greedy picking under constraints is common in string construction problems like "Reorganize String" and "Task Scheduler".