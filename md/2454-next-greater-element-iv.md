### Leetcode 2454 (Hard): Next Greater Element IV [Practice](https://leetcode.com/problems/next-greater-element-iv)

### Description  
Given an array of non-negative integers `nums`, for each index i, find the second greater integer to the right of i:
- The "second greater" for nums[i] is the integer nums[j] such that:
  - j > i
  - nums[j] > nums[i]
  - There is exactly one index k with i < k < j such that nums[k] > nums[i] and nums[k] < nums[j].
If no such element exists, return -1 for that index.

### Examples  

**Example 1:**  
Input: `[2, 4, 0, 9, 6]`  
Output: `[9, 6, 6, -1, -1]`  
*Explanation:*
- For 2: 4 is first greater (\(k=1\)), then 9 (\(j=3\)) is the *second* greater.
- For 4: 9 is first, then 6 (\(j=4\)) is the second greater after 9.
- For 0: 4 (first), 9 (second), but as per condition, 6 is also valid. Here, '6' is considered the second greater that strictly follows the "second occurrence" as per stack ordering.
- 9 and 6 have no second greater on right.

**Example 2:**  
Input: `[3,1,5,2,4,6]`  
Output: `[5,4,6,6,-1,-1]`  
*Explanation:* 
- For 3: 5 (first), 4 (second).
- For 1: 5 (first), 4 (second).
- For 5: 6 is the first and only greater right of 5, so -1 for second.
- For 2: 4 (first), 6 (second).
- For 4: 6 (first, no second).
- For 6: none right.

**Example 3:**  
Input: `[1,2,4,3]`  
Output: `[4,3,-1,-1]`  
*Explanation:*  
- For 1: 2 (first), 4 (second).
- For 2: 4 (first), 3 (second).
- 4 and 3: no valid results right.

### Thought Process (as if you’re the interviewee)  
- **Brute Force:**  
  For every i, scan right for the first greater, then scan again for a second greater. This is O(n²), which is too slow for large n.

- **Optimization:**  
  The "Next Greater Element" (NGE) for each position can be found in O(n) using a stack.  
  For the "second greater", we need to simulate finding the next greater *twice* for each index efficiently.
  - **Stack-based approach:** Instead of single stack, use two stacks:
    - Stack1 for waiting for first greater (as in NGE).
    - Stack2 for waiting for second greater (push indices from stack1 once their first greater is found).
    - Traverse from left-to-right for second greater logic:
      - Whenever we see nums[j], we first resolve current stack2 then stack1.
    - This pattern allows O(n) computation by always keeping track of "how many greater elements to skip".

- **Why this approach:**  
  Using two stacks lets us process both first and second NGE in a single left-to-right pass, in O(n) time and space. This leverages monotonic stack patterns for advanced ordered lookup.

### Corner cases to consider  
- Empty array: Should return [].
- Length 1: Return [-1].
- Strictly increasing or decreasing arrays: Should return all -1 or skip over no appropriate candidates.
- All identical values: All should be -1.
- Multiple equal "greater" values: Ensure correct ordering.
- Large values at the end: Only those earlier can have valid answers.

### Solution

```python
def secondGreater(nums):
    n = len(nums)
    ans = [-1] * n

    stack1 = []  # Indices waiting for their first greater
    stack2 = []  # Indices waiting for their second greater

    for i, num in enumerate(nums):
        # Resolve stack2: For any index whose 'second greater' is num
        # stack2: store indices where we've already seen 1 greater (and waiting for 2nd)
        new_stack2 = []
        while stack2:
            idx = stack2.pop()
            if nums[idx] < num:
                ans[idx] = num
            else:
                new_stack2.append(idx)
        stack2 = new_stack2[::-1]
        
        # Resolve stack1: move indices to stack2 if they find first greater
        new_stack1 = []
        while stack1:
            idx = stack1.pop()
            if nums[idx] < num:
                stack2.append(idx)
            else:
                new_stack1.append(idx)
        stack1 = new_stack1[::-1]

        stack1.append(i)

    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  Each index is pushed and popped from stack1 and stack2 at most once, yielding linear total operations.

- **Space Complexity:** O(n)  
  For explicit output and stacks. Each stack can hold up to O(n) indices in the worst case.

### Potential follow-up questions (as if you’re the interviewer)  

- Can you generalize this approach to find the kᵗʰ greater to the right?
  *Hint: How would you manage multiple passes or stacks for more than two levels?*

- Can you solve this problem in place (without extra arrays for stacks)?
  *Hint: Consider encoding additional state in the input or keeping minimal state.*

- What if the array is extremely large and does not fit in memory?
  *Hint: Could you process it in chunks, or parallelize across sorted windows?*

### Summary
This problem is a two-layer extension of the classic "next greater element" pattern, best solved using two monotonic stacks to track elements waiting for their first and second greater elements. The pattern generalizes for next-k-greater scenarios, and is common in subarray and span lookup problems. The stack-based approach ensures linear time and is a vital coding technique for range query and next-element type problems.


### Flashcard
Use two stacks to track indices waiting for their first and second greater elements; process from right to left to efficiently find the second greater for each index.

### Tags
Array(#array), Binary Search(#binary-search), Stack(#stack), Sorting(#sorting), Heap (Priority Queue)(#heap-priority-queue), Monotonic Stack(#monotonic-stack)

### Similar Problems
- Next Greater Element I(next-greater-element-i) (Easy)
- Replace Elements with Greatest Element on Right Side(replace-elements-with-greatest-element-on-right-side) (Easy)
- Apply Operations to Maximize Score(apply-operations-to-maximize-score) (Hard)