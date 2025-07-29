### Leetcode 2974 (Easy): Minimum Number Game [Practice](https://leetcode.com/problems/minimum-number-game)

### Description  
Given a 0-indexed integer array **nums** of even length, Alice and Bob play a game:
- In each round, first **Alice removes the minimum** number from nums, then **Bob removes the next minimum** number from what's left.
- In the same round, **Bob first appends his removed number** to an array arr, followed by Alice appending her removed number.
- Repeat until nums is empty.
Return the resulting array **arr**.

### Examples  

**Example 1:**  
Input: `[5,4,2,3]`,  
Output: `[3,2,5,4]`  
Explanation:  
- Round 1: Alice removes 2, Bob removes 3. Bob appends 3, Alice appends 2 → arr becomes [3,2].
- Remaining: [5,4]. Round 2: Alice removes 4, Bob removes 5. Bob appends 5, Alice appends 4 → arr becomes [3,2,5,4].

**Example 2:**  
Input: `[2,5]`,  
Output: `[5,2]`  
Explanation:  
- Round 1: Alice removes 2, Bob removes 5. Bob appends 5, Alice appends 2 → arr becomes [5,2].

**Example 3:**  
Input: `[1,3,2,4]`,  
Output: `[3,1,4,2]`  
Explanation:  
- Round 1: Alice removes 1, Bob removes 2. Bob appends 2, Alice appends 1 → arr becomes [2,1].
- Remaining: [3,4]. Round 2: Alice removes 3, Bob removes 4. Bob appends 4, Alice appends 3 → arr becomes [2,1,4,3].
- But per the rules, since Bob appends BEFORE Alice each round, the full sorted order is that at every pair we take sorted elements and for every even index from end append first, then next.

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
  Simulate the removal of min elements from nums, repeating sorting and searching for mins every time (inefficient).
- **Optimize:**  
  Since Alice and Bob always remove the two smallest remaining numbers, and their append order is always the same, sort nums first.
  For every consecutive pair in sorted nums (nums,nums[1]), Bob gets nums[1], Alice gets nums in arr.
- **Why this works:**  
  Sorting up front and then alternating assignment captures the described removal-order exactly, while building arr in the correct append order.

### Corner cases to consider  
- Empty array (per constraints, not possible)
- All elements equal: e.g., `[7,7,7,7]` → Bob always gets 7, then Alice gets 7.
- Already sorted or reverse sorted input
- Only two elements in nums
- Duplicates intermixed with unique elements

### Solution

```python
def numberGame(nums):
    # Sort nums to simulate always removing minimum values
    nums.sort()
    arr = []
    # Traverse sorted list in pairs:
    for i in range(0, len(nums), 2):
        # Bob's turn (second smallest for the round)
        arr.append(nums[i+1])
        # Alice's turn (smallest for the round)
        arr.append(nums[i])
    return arr
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(n log n) for sorting nums of length n, O(n) for forming arr, so total O(n log n).
- **Space Complexity:**  
  O(n) for output arr. No extra structures outside input/output.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the length of nums was odd?  
  *Hint: How would you handle the last unpaired element?*

- How would you generalize this to three or more players?  
  *Hint: Consider rotating removal/append order among players using a queue.*

- Can you do this in-place without using an extra arr array?  
  *Hint: Is it possible to reuse or overwrite elements in nums for the final result?*

### Summary
This problem uses the **sorting + pairing pattern** common in greedy ferrying or scheduling problems: preprocess input, then process in fixed-size chunks. By flattening the simulation to a sort + for loop, we greatly simplify the logic and avoid repeated scans. This is a common pattern for any "take min/k in order" scenarios, applicable to many scheduling and two-pointer questions.