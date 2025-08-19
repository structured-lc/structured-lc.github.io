### Leetcode 2938 (Medium): Separate Black and White Balls [Practice](https://leetcode.com/problems/separate-black-and-white-balls)

### Description  
Given a string representing balls arranged in a row, where '1' is a black ball and '0' is a white ball, you can only swap adjacent balls. The task is to compute the minimum number of adjacent swaps required to move all black balls to the right and all white balls to the left.

Imagine the string as a series of black and white balls. You want all the white (0) balls to group on the left side and all black (1) balls on the right, using the smallest number of adjacent swaps. Each swap can only move a ball by one position at a time.

### Examples  

**Example 1:**  
Input: `s = "101"`  
Output: `1`  
*Explanation:  
The string starts as 1 0 1.  
Swap positions 0 and 1: 0 1 1.  
Now all ‘1’s are to the right. Only 1 swap needed.*

**Example 2:**  
Input: `s = "100"`  
Output: `0`  
*Explanation:  
String is 1 0 0. The single black ball is already to the right of all the white balls. So zero swaps are needed.*

**Example 3:**  
Input: `s = "110100"`  
Output: `3`  
*Explanation:  
Initial: 1 1 0 1 0 0  
- Move the 1 at index 2 right by 2 steps (swap with 1, then 0 at indices 3 and 4): 1 1 1 0 0 0 (2 swaps so far)  
- Move the 1 at index 0 right by 1 step: 1 1 1 (no swap needed here)  
But optimized:  
Count how many black balls a white has to cross as we sweep left to right.  
Total swaps: 3.*


### Thought Process (as if you’re the interviewee)  
First, let's understand the cost: Each time a black ball is to the left of a white ball, we need to swap so that eventually all white balls are to the left of the black balls. Since only adjacent swaps are allowed, to move a black over a white, we can only swap them one position at a time.

**Brute-force:**  
Try all possible swaps until we achieve the correct arrangement. This is very inefficient, O(n²), as each misplaced black or white may require multiple passes over the array.

**Better/Optimal Approach:**  
Notice that for every white ball ('0'), if there are black balls before it, each has to be swapped past this white ball.  
The optimal solution:  
- Sweep left to right.  
- Keep a count of how many black balls ('1') have been seen so far.  
- For each white ball ('0'), the total number of swaps required for it is equal to the count of black balls seen before this point.  
- The sum across all '0's gives the answer.  

Why optimal: In each adjacent swap, only one black moves right past a white; so you can't do better than this, and every swap moves you strictly closer.

**Trade-offs:**  
- O(n) time and O(1) space.
- Greedy. No backtracking needed.

### Corner cases to consider  
- Empty string: input `''` (should return `0`)
- Only black balls: input `'1111'` (should return `0`)
- Only white balls: input `'0000'` (should return `0`)
- Alternating balls: input like `'1010'`
- All black on the right: input like `'00011'`
- All black on the left: input like `'11000'`
- Single ball: input `'1'` or `'0'`

### Solution

```python
def minimumSteps(s: str) -> int:
    # Count of black balls (seen so far as we iterate left to right)
    black_count = 0
    swaps = 0
    
    for c in s:
        if c == '1':  # Black ball
            black_count += 1
        else:         # White ball
            # Each white ball needs to cross over all previous black balls
            swaps += black_count
    return swaps
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  We sweep the string once, processing each character in constant time.

- **Space Complexity:** O(1)  
  Only two integer counters are used; no extra space depending on input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if we need to separate a larger set of colors, say R, G, and B, in a specific order?  
  *Hint: Try extending the greedy counting method, making passes for each color.*

- Suppose you can swap any two balls, not just adjacent ones—what changes?  
  *Hint: Count all inversions (classic merge sort count).*

- How would the solution change if you could only swap if a specific property holds (e.g., weight, not just color)?  
  *Hint: Adjust counting to use properties, possibly requiring a modified two-pointer scan.*

### Summary
This problem is an example of greedy accumulation, specifically a **prefix counting** trick. The core pattern is similar to **counting inversions** but restricted to adjacent swaps, so the total minimum equals the sum of black balls before every white ball.  
This approach frequently appears when arranging binary strings, sorting by adjacent swaps, or moving elements with minimal steps under similar constraints. Remember the counting prefix strategy in adjacent swap and two-grouping problems!

### Tags
Two Pointers(#two-pointers), String(#string), Greedy(#greedy)

### Similar Problems
