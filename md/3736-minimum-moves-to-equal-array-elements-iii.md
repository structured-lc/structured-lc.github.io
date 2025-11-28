### Leetcode 3736 (Easy): Minimum Moves to Equal Array Elements III [Practice](https://leetcode.com/problems/minimum-moves-to-equal-array-elements-iii)

### Description

You are given an array of integers. In one move, you can increase any single element by 1. Your task is to find the minimum number of moves required to make all elements in the array equal. The key insight is that to minimize total moves, you should target the maximum element as your goal value, since you can only increment values upward.

### Examples

**Example 1:**  
Input: `nums = [2, 1, 3]`  
Output: `3`  
*Explanation: Maximum element is 3. Element 2 needs 1 move to reach 3. Element 1 needs 2 moves to reach 3. Total = 1 + 2 = 3 moves.*

**Example 2:**  
Input: `nums = [1, 1, 1]`  
Output: `0`  
*Explanation: All elements are already equal, so 0 moves needed.*

**Example 3:**  
Input: `nums = [5, 2, 8, 1]`  
Output: `14`  
*Explanation: Maximum element is 8. Element 5 needs 3 moves. Element 2 needs 6 moves. Element 1 needs 7 moves. Total = 3 + 6 + 7 = 14 moves.*

### Thought Process (as if you're the interviewee)

My first instinct is to think: "What value should I make all elements equal to?" I could try every possible value, but that seems wasteful. 

Then I realize—since I can only increment, never decrement, the optimal target must be the maximum element in the array. There's no benefit to going higher because then all elements would need even more moves.

So the algorithm becomes straightforward:
1. Find the maximum element in the array
2. For each element, calculate how many increments are needed to reach the maximum
3. Sum all these differences

This is a greedy approach: pick the maximum as the target (which guarantees no element needs to go higher), and calculate total gaps to fill.

### Corner cases to consider

- All elements are already equal (array like `[5, 5, 5]`) → output should be 0
- Single element array (like `[7]`) → output should be 0
- Array with one very large element and many small ones (like `[1, 1, 1, 100]`) → need to handle large sums correctly
- Array with minimum constraint values (like all 1s or all at upper bound)

### Solution

```python
def minimumMoves(nums):
    # Step 1: Find the maximum element in the array
    max_element = max(nums)
    
    # Step 2: Calculate total moves needed
    # For each element, add the difference between max and that element
    total_moves = 0
    for num in nums:
        total_moves += max_element - num
    
    return total_moves
```

### Time and Space complexity Analysis

- **Time Complexity:** O(n) where n is the length of the array. We iterate through the array once to find the maximum, and then iterate through it again to calculate the sum of differences. Both operations are linear.

- **Space Complexity:** O(1). We only use a constant amount of extra space for storing the maximum value and the total moves counter. No additional data structures are used.

### Potential follow-up questions (as if you're the interviewer)

- (Follow-up question 1)  
  *What if you could both increment and decrement elements? How would the problem change?*  
  *Hint: Think about the median of the array rather than the maximum. The optimal target would be a value that minimizes total absolute differences.*

- (Follow-up question 2)  
  *What if each increment operation increases n-1 elements instead of just one element?*  
  *Hint: Consider that incrementing n-1 elements is equivalent to decrementing 1 element relatively. Think about the minimum element instead.*

- (Follow-up question 3)  
  *How would you solve this if the cost of incrementing different elements was different (weighted)?*  
  *Hint: You'd still target the maximum, but when summing, multiply each difference by its corresponding weight.*

### Summary

This problem demonstrates a **greedy optimization** pattern. The key insight is recognizing that when you can only move in one direction (increment), the optimal target is always at the extreme boundary (maximum). This transforms a potentially complex optimization problem into a simple linear calculation. The pattern applies to similar problems where you need to make values equal with uni-directional operations—always target the boundary that requires no movement for the optimal element, then calculate total adjustments needed for others.


### Flashcard
Target must be the maximum element (no benefit going higher); sum differences between max and all other elements.

### Tags
Array(#array), Math(#math)

### Similar Problems
