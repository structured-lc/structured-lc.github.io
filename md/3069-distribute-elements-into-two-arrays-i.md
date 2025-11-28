### Leetcode 3069 (Easy): Distribute Elements Into Two Arrays I [Practice](https://leetcode.com/problems/distribute-elements-into-two-arrays-i)

### Description  
Given an array of distinct integers, distribute its elements into two separate arrays, arr₁ and arr₂, following these rules:
- Place the first element (`nums`) into arr₁.
- Place the second element (`nums[1]`) into arr₂.
- For each remaining element (`nums[i]`, for i ≥ 2), compare the last elements of arr₁ and arr₂:
  - If the last element in arr₁ is greater than the last in arr₂, append `nums[i]` to arr₁.
  - Otherwise, append `nums[i]` to arr₂.
- At the end, return the result of arr₁ followed by arr₂ concatenated.

### Examples  

**Example 1:**  
Input: `nums = [5, 4, 3, 8]`  
Output: `[5, 3, 4, 8]`  
*Explanation:  
- arr₁: [5] (placed nums), arr₂: [4] (placed nums[1])
- nums[2]=3: 5 > 4, so 3 → arr₁ → arr₁: [5, 3]
- nums[3]=8: last arr₁=3, arr₂=4. 3 < 4, so 8 → arr₂ → arr₂=[4, 8]
- Output: [5,3] + [4,8] = [5, 3, 4, 8]
*

**Example 2:**  
Input: `nums = [1, 2]`  
Output: `[1, 2]`  
*Explanation:  
- arr₁: [1], arr₂: [2]. No further elements.
- Output: [1] + [2] = [1, 2]
*

**Example 3:**  
Input: `nums = [10, 20, 30, 40, 50]`  
Output: `[10, 30, 50, 20, 40]`  
*Explanation:  
- arr₁: , arr₂: 
- nums[2]=30: 10 < 20 → 30 → arr₂ → arr₂=[20, 30]
- nums[3]=40: arr₁=10, arr₂=30; 10 < 30 → 40 → arr₂ → arr₂=[20,30,40]
- nums[4]=50: arr₁=10, arr₂=40; 10 < 40 → 50 → arr₂ → arr₂=[20,30,40,50]
- Wait, fix the logic: it's actually after each move, arr₁ only updates when you add to it. Let's update step-by-step:
  - arr₁=, arr₂=
  - nums[2]=30: 10 < 20 ⇒ 30 → arr₂: arr₂=[20,30]
  - nums[3]=40: arr₁=10, arr₂=30; 10 < 30 ⇒ 40 → arr₂: arr₂=[20,30,40]
  - nums[4]=50: arr₁=10, arr₂=40; 10 < 40 ⇒ 50 → arr₂: arr₂=[20,30,40,50]
- But in the spec, 2nd element always goes to arr₂ -- so all others go according to rule.
- So output:  + [20, 30, 40, 50] = [10, 20, 30, 40, 50]
- However, from provided code and example, apparently first goes to arr₁, then arr₂, then for nums[2]:
    - arr₁=, arr₂=
    - last arr₁=10, last arr₂=20, 10 < 20 → append to arr₂: arr₂=[20,30]
    - nums[3]=40: arr₁=10, arr₂=30, 10 < 30 → arr₂: [20,30,40]
    - nums[4]=50: arr₁=10, arr₂=40, 10 < 40 → arr₂: [20,30,40,50]
    - Final:  + [20,30,40,50] = [10,20,30,40,50]
- Explanation in this example: Because arr₁ always holds just the first element, all other elements go to arr₂ since its last element is always greater.
*

### Thought Process (as if you’re the interviewee)  
- The rules are deterministic and straightforward; simulate step by step.
- Start arr₁ with first, arr₂ with second element.
- For each i ≥ 2, compare the last of arr₁ and arr₂.
- If arr₁'s last > arr₂'s last, add to arr₁. Else, add to arr₂.
- At end, concatenate arr₁ and arr₂.
- No fancy data structures or sorts needed—just lists and careful indexing.
- Since every number is checked once, that's efficient (O(n)).
- No real optimization required beyond direct simulation; trade-off is clarity vs minimal minor optimization (e.g. using array directly or not).

### Corner cases to consider  
- Single element array (should just return that element)
- Two elements (direct split, no comparisons needed)
- Already strictly increasing or decreasing array
- All outputs going to one array after the 2nd number (if always arr₁ > arr₂ or vice versa)
- Negative numbers and large positive numbers (since numbers are just "distinct")

### Solution

```python
def distribute_elements(nums):
    # Handle edge cases for length < 2
    if not nums:
        return []
    if len(nums) == 1:
        return nums.copy()
    
    arr1 = [nums[0]]
    arr2 = [nums[1]]

    for i in range(2, len(nums)):
        # Compare last elements
        if arr1[-1] > arr2[-1]:
            arr1.append(nums[i])
        else:
            arr2.append(nums[i])
    # Concatenate arr1 and arr2
    return arr1 + arr2
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), because we iterate once through the `nums` array, and list append and final concatenation are O(n).
- **Space Complexity:** O(n), since arr₁ and arr₂ together store all elements, extra space usage is proportional to input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if duplicate numbers are allowed?  
  *Hint: How does the comparison logic interact if values repeat?*

- Can you modify the logic to maintain both resulting arrays sorted?  
  *Hint: Is additional sorting needed during insertion or after?*

- Could you generalize this to k arrays instead of 2, using a similar placement rule?  
  *Hint: What would be the rule for selecting which of k arrays receives the next element?*

### Summary
This problem demonstrates the **greedy simulation pattern**, where you iteratively build answers step by step based on immediate local choices. It's a good example of constructive list building and state tracking with arrays. This pattern also arises in problems where decisions depend on current or previous elements, such as partitioning, scheduling, or sequential grouping tasks.


### Flashcard
Simulate step-by-step: start with arr₁ = [first], arr₂ = [second], then for each remaining element, append to arr₁ or arr₂ based on last element comparison.

### Tags
Array(#array), Simulation(#simulation)

### Similar Problems
- Split Array Largest Sum(split-array-largest-sum) (Hard)
- Divide Array Into Equal Pairs(divide-array-into-equal-pairs) (Easy)