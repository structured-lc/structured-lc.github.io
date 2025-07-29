### Leetcode 945 (Medium): Minimum Increment to Make Array Unique [Practice](https://leetcode.com/problems/minimum-increment-to-make-array-unique)

### Description  
Given an array of integers `nums`, you can increment any element by 1 in a move. Your goal is to make every element in the array unique using the minimum number of moves. Return the least number of moves needed so that no two elements in the array are the same.

### Examples  

**Example 1:**  
Input: `nums = [1,2,2]`  
Output: `1`  
*Explanation: Increment one of the `2`s to `3`: [1,2,3]. Only 1 move is needed.*

**Example 2:**  
Input: `nums = [3,2,1,2,1,7]`  
Output: `6`  
*Explanation:  
One way:  
[3,2,1,2,1,7] → increment nums[1]=2 to 4 ([3,4,1,2,1,7], 1 move)  
increment nums[2]=1 to 5 ([3,4,5,2,1,7], 2 more moves)  
increment nums[4]=1 to 6 ([3,4,5,2,6,7], 5 moves so far)  
increment nums[3]=2 to 8 ([3,4,5,8,6,7], 6 moves total)  
That's one possible way, total 6 moves.*

**Example 3:**  
Input: `nums = [0,0,0,0]`  
Output: `6`  
*Explanation: The array becomes [0,1,2,3] in 6 moves.*

### Thought Process (as if you’re the interviewee)  
- **Naive approach:** For every duplicate, keep incrementing it until it’s unique. That would require checking and rechecking the whole array for every increment—very inefficient for large arrays.
- **Optimize:**  
  - Sorting brings duplicates together so we can handle them in sequence.
  - After sorting, iterate from the second element. If `nums[i]` ≤ `nums[i-1]`, we know it's not unique (or less than the previous number).  
  - To make it unique: Set `nums[i]` = `nums[i-1] + 1` and accumulate the number of increments needed (`nums[i-1] + 1 - nums[i]`).
  - This guarantees all elements to the left are unique and strictly increasing.
- **Trade-offs:**  
  - Sorting has time complexity O(n log n).
  - Alternative counting sort-based approaches exist, but require extra space and can be overkill unless the value range is small.

### Corner cases to consider  
- Empty array (should output 0 moves).
- All unique elements (should output 0 moves).
- All elements the same (worst case: many increments).
- Large numbers (ensure no integer overflows).
- Negative numbers (not part of constraints, but check if implementation-generalized).
- Only one element (already unique).

### Solution

```python
def minIncrementForUnique(nums):
    # Sort to bring duplicates together
    nums.sort()
    moves = 0
    for i in range(1, len(nums)):
        # If not unique, increment
        if nums[i] <= nums[i - 1]:
            required = nums[i - 1] + 1 - nums[i]
            moves += required
            nums[i] = nums[i - 1] + 1  # Make current value unique
    return moves
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n), due to sorting the array and then a single pass through the array.
- **Space Complexity:** O(1) extra space, unless the sort implementation requires extra space. The in-place sort typically is acceptable in an interview.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you optimize further if the range of values in the array is very small?
  *Hint: Think about using a frequency/counting array instead of sorting.*

- What would you do if you were *required* to minimize the actual modified values instead of just the moves?
  *Hint: Greedy approach still works, but pay attention to the final array values themselves.*

- Can you handle cases where you’re allowed to decrement or increment elements?
  *Hint: Explore the options using both increment and decrement; does it minimize moves?*

### Summary
This problem uses the **greedy** approach and leverages **sorting** to simplify handling duplicates. At each step, we force every duplicate to be just bigger than the previous value, guaranteeing uniqueness with the minimum increments. This is a general pattern in greedy problems dealing with making elements distinct, and the **sorted-sweep** pattern is common in array manipulation interview questions.