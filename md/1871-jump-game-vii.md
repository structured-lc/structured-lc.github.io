### Leetcode 1871 (Medium): Jump Game VII [Practice](https://leetcode.com/problems/jump-game-vii)

### Description  
Given a 0-indexed binary string `s` and two integers `minJump` and `maxJump`, you start at index 0, which is always '0'. From an index `i`, you can jump to any index `j` where:

- `i + minJump ≤ j ≤ min(i + maxJump, n-1)`
- `s[j] == '0'`

Your goal is to check if you can reach the last index (`n-1`), following these rules.

### Examples  

**Example 1:**  
Input: `s = "011010", minJump = 2, maxJump = 3`  
Output: `true`  
*Explanation: First jump from 0 → 3 (as s[3] == '0' and 2 ≤ 3 ≤ 3), then from 3 → 5 (s[5] == '0', 3+2=5 ≤ 5 ≤ 3+3=6). Thus, you reach the end.*

**Example 2:**  
Input: `s = "01101110", minJump = 2, maxJump = 3`  
Output: `false`  
*Explanation: You cannot reach the last index due to obstacles at certain positions that prevent any valid path to the last '0'.*

**Example 3:**  
Input: `s = "000000", minJump = 2, maxJump = 5`  
Output: `true`  
*Explanation: From index 0, you can directly jump to 2, 3, 4, or 5. Since s[5] is '0', reaching the end in one jump is possible.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  Start at index 0. For each current index, try all valid jumps in the range [i + minJump, min(i + maxJump, n-1)]. If any jump lands on a '0', recursively continue from there. This leads to an exponential number of paths and is very slow for long strings.
- **Optimization:**  
  Use BFS with a queue to only process each reachable index once. Keep a visited array to avoid cycles and redundant work.
  Further, to optimize, don't repeatedly visit indices: only enqueue and mark as visited if reachable and not yet considered.
  For large inputs, keeping track of the farthest processed index helps avoid O(n²) behavior by only checking new reachable positions for each BFS expansion.

  **Final Approach:**  
  - Use a queue to perform BFS.
  - For each index, only consider the range starting from the farthest added (to avoid overlapping work).
  - Whenever you reach the last index, return True.
  - If the queue exhausts, return False.

### Corner cases to consider  
- All '0's: Should always return true if jumps are feasible.
- All '1's after start: No movement possible, return false.
- Last element is '1': End not reachable.
- minJump == maxJump: Only fixed jump length allowed.
- minJump > 1: Can't jump to next index directly.
- Only 2 elements: Trivial jump scenario.
- Long sequences with large maxJump.

### Solution

```python
from collections import deque

def canReach(s: str, minJump: int, maxJump: int) -> bool:
    n = len(s)
    queue = deque([0])                # Start BFS from index 0
    farthest = 0                      # The farthest index we've checked

    while queue:
        curr = queue.popleft()
        # Only consider jumps from the next new position up to allowed max
        start = max(curr + minJump, farthest + 1)
        end = min(curr + maxJump, n - 1)
        for next_pos in range(start, end + 1):
            if s[next_pos] == '0':
                if next_pos == n - 1:
                    return True
                queue.append(next_pos)
        farthest = end
    return False
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  Each index is checked at most once: For each character, we may add it to the queue once, and each jump range is processed only for unvisited indices.
- **Space Complexity:** O(n)  
  The queue, and implicit visited-tracking via range, use up to O(n) space.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you solve it if jumps could be of variable lengths, not just a fixed interval?  
  *Hint: Think about representing jumps as a list or using DP for arbitrary steps.*

- What if you had to return the minimum number of jumps instead of just whether reaching the end is possible?  
  *Hint: Standard BFS level tracking helps count jumps.*

- Can you solve it using O(1) extra space?  
  *Hint: Consider modifying the input or reusing it to mark visited cells.*

### Summary
This problem is a classical **dynamic BFS window** problem, where you track reachability within growing intervals efficiently. Avoiding brute-force checks by moving a 'farthest' pointer is essential for O(n) performance. This sliding window + BFS idea is used in many jump and reachability style LeetCode questions, making it a reusable pattern for graph traversal and restricted-dynamic-reach problems.


### Flashcard
Use BFS to optimize the jump game by avoiding redundant paths.

### Tags
String(#string), Dynamic Programming(#dynamic-programming), Sliding Window(#sliding-window), Prefix Sum(#prefix-sum)

### Similar Problems
- Jump Game II(jump-game-ii) (Medium)
- Jump Game(jump-game) (Medium)
- Jump Game III(jump-game-iii) (Medium)
- Jump Game IV(jump-game-iv) (Hard)
- Jump Game V(jump-game-v) (Hard)
- Jump Game VI(jump-game-vi) (Medium)
- Jump Game VII(jump-game-vii) (Medium)
- Jump Game VIII(jump-game-viii) (Medium)
- Count Vowel Strings in Ranges(count-vowel-strings-in-ranges) (Medium)
- Maximum Number of Jumps to Reach the Last Index(maximum-number-of-jumps-to-reach-the-last-index) (Medium)