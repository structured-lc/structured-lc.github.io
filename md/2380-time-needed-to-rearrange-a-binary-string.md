### Leetcode 2380 (Medium): Time Needed to Rearrange a Binary String [Practice](https://leetcode.com/problems/time-needed-to-rearrange-a-binary-string)

### Description  
You are given a binary string **s** made up of only '0's and '1's. In **one second**, you can **simultaneously** replace every occurrence of the substring "01" with "10". This process repeats each second.  
Return the **number of seconds** needed so that there is **no "01" substring** left in the string (all the '1's are moved to the left of all the '0's and won't move anymore).

### Examples  

**Example 1:**  
Input: `s = "0110101"`  
Output: `4`  
*Explanation: Each second, all "01"s become "10"s (simultaneously):  
- t=0: 0 1 1 0 1 0 1  
- t=1: 1 0 1 1 0 1 0 → "01" at positions [1,3,5] ⇒ swaps at these locations ⇒ 1 1 0 1 1 0 0  
- t=2: 1 1 0 1 1 0 0 → swaps at [2] ⇒ 1 1 1 0 1 0 0  
- t=3: 1 1 1 0 1 0 0 → swaps at [3] ⇒ 1 1 1 1 0 0 0  
- t=4: No more "01" left, done.  
So, 4 seconds needed.*

**Example 2:**  
Input: `s = "11100"`  
Output: `0`  
*Explanation: All '1's are already to the left of all '0's. No swaps needed; return 0.*

**Example 3:**  
Input: `s = "1001"`  
Output: `2`  
*Explanation:  
- t=0: 1 0 0 1  
- t=1: swap at [2]: 1 0 1 0  
- t=2: swap at [1]: 1 1 0 0  
The string is ordered after 2 seconds.*

### Thought Process (as if you’re the interviewee)  

First, a **brute-force simulation** came to mind:  
- For each second, scan from left to right for the "01" pattern and flip it to "10" everywhere (simultaneously), repeat until no "01" is found.  
- This is O(n²) in the worst case since in each second, you might need to check every index, for up to n seconds.

But, on closer inspection, you can **track the movement of '1's and '0's more efficiently**:
- Whenever you see a '1', count how many zeros ('0's) have been seen before it. Every '1' must "jump" over all the zeros to its left.
- But, since the swaps are simultaneous, each '1' can't pass another '1' blocking it.  
- So, for each '1', you track how many zeros it's behind, and how many steps it will take to "catch up" to those zeros, but the speed is limited by other '1's in front.

**Optimized:**  
- For each character in the string, if it's '1' and we've seen `zero_count` zeros before, then the minimum number of seconds for that '1' to go left is the *maximum* between the previous required seconds plus 1, or `zero_count`.
- Take the maximum across all '1's.

This gives an O(n) one-pass solution.

### Corner cases to consider  
- Empty string (length 0 or 1)
- Already sorted: all '1's on the left
- All zeros or all ones
- Alternating "010101..." and "101010..."
- Multiple consecutive zeros or ones

### Solution

```python
def secondsToRemoveOccurrences(s: str) -> int:
    max_wait = 0        # Maximum steps required
    zero_count = 0      # Number of zeros seen so far
    for c in s:
        if c == '0':
            zero_count += 1
        else:
            if zero_count > 0:
                # Each '1' must pass all zeros before it, but can't overtake other '1's
                max_wait = max(max_wait + 1, zero_count)
    return max_wait
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  Only a single pass through the string, each character processed once.
- **Space Complexity:** O(1)  
  Only a few integer variables, no extra storage proportional to the input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if instead of "01" → "10", you could swap any two adjacent elements if the left is less than the right?
  *Hint: Think general sorting, bubble-sort-like simulation.*

- Suppose you can only swap one "01" at each step (not simultaneously)?
  *Hint: How does this change from multiple to single swaps per step?*

- How would you modify your approach if instead of '0's and '1's, you had k distinct characters and a similar "sort by swaps" operation?
  *Hint: Consider relative movements and generalizations of this problem.*

### Summary
This problem employs a **simulation with greedy tracking** pattern, but can be solved optimally in O(n) time by careful book-keeping—tracking how many zeros each '1' must cross and accounting for simultaneous moves. This "count an obstruction and propagate delay" approach appears in many "transform/arrange string by iterative swaps" problems, and is useful in sorting by adjacent swaps, scheduling tasks with dependencies, and motion-planning in discrete steps.


### Flashcard
For each '1', count how many '0's precede it—that's how many swaps it needs; sum these counts for total seconds in O(n) time.

### Tags
String(#string), Dynamic Programming(#dynamic-programming), Simulation(#simulation)

### Similar Problems
- Minimum Swaps to Group All 1's Together(minimum-swaps-to-group-all-1s-together) (Medium)
- Minimum Swaps to Group All 1's Together II(minimum-swaps-to-group-all-1s-together-ii) (Medium)