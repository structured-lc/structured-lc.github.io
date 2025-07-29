### Leetcode 453 (Medium): Minimum Moves to Equal Array Elements [Practice](https://leetcode.com/problems/minimum-moves-to-equal-array-elements)

### Description  
Given an integer array nums of size n, return the minimum number of moves required to make all array elements equal. In one move, you can increment n-1 elements of the array by 1.

### Examples  

**Example 1:**  
Input: `nums = [1,2,3]`  
Output: `3`  
*Explanation: Only three moves are needed (remember each move increments two elements):*
*[1,2,3] → [2,3,3] → [3,4,3] → [4,4,4]*

**Example 2:**  
Input: `nums = [1,1,1]`  
Output: `0`  
*Explanation: All elements are already equal, so no moves are needed.*


### Thought Process (as if you're the interviewee)  
The key insight is to reframe the problem. Instead of thinking about incrementing n-1 elements, we can think about it as decrementing 1 element each time.

**Initial Approach:**
If we increment n-1 elements by 1, it's equivalent to decrementing 1 element by 1 relative to the final target value.

**Key Insight:**
The final target value will be when all elements equal the maximum element in the array (since we can only increment, never decrement).

Wait, that's not quite right. Let me think again...

**Better Insight:**
If we increment n-1 elements each time, the relative differences matter. Each move effectively decreases one element relative to others.

The minimum element will determine how many moves we need. Every element needs to "catch up" to the same level. Since we increment n-1 elements each time, it's equivalent to reducing the gap for the minimum element.

**Mathematical Approach:**
The answer is sum(nums) - n × min(nums).

Why? Because in the end, all elements will equal min(nums) + k for some k (number of moves). The total sum will be n × (min(nums) + k). Since each move adds n-1 to the sum, the total number of moves k equals the difference in sums divided by (n-1).

Actually, let me reconsider: if all elements end up equal to some value x, and we make k moves, then:
- Initial sum: sum(nums)  
- Final sum: n × x
- Each move adds (n-1) to total sum
- So: sum(nums) + k×(n-1) = n×x

The optimal x is min(nums) + k, and we want to minimize k.
This gives us: k = sum(nums) - n×min(nums).


### Corner cases to consider  
- All elements already equal: Should return 0  
- Array with only one element: Should return 0  
- Array with negative numbers: Algorithm should still work  
- Large arrays: Need to handle potential integer overflow in sum calculation  


### Solution

```python
# Just like in interviews, please do not use python libraries to take shortcuts.
# They aren't usually allowed in real interviews.
# Add comments to each step of your logic

def minMoves(nums):
    # Key insight: incrementing n-1 elements by 1 is equivalent to 
    # decrementing 1 element by 1 relative to the final state
    
    # The minimum number of moves needed is the sum of differences
    # between each element and the minimum element
    min_val = min(nums)
    
    # Calculate total moves needed
    moves = 0
    for num in nums:
        moves += num - min_val
    
    return moves

```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) - We iterate through the array once to find the minimum value, then iterate again to calculate the total moves. Both operations are O(n).
- **Space Complexity:** O(1) - We only use a constant amount of extra space for variables min_val and moves.


### Potential follow-up questions (as if you're the interviewer)  

- What if instead of incrementing n-1 elements, you could increment any k elements in one move?  
  *Hint: The problem becomes more complex and might require dynamic programming or different mathematical analysis*

- Can you solve the variant where you can both increment and decrement elements?  
  *Hint: This becomes much simpler - just calculate the median and sum up absolute differences*

- What if there's a cost associated with each move and you want to minimize total cost?  
  *Hint: This could become a more complex optimization problem depending on the cost structure*

### Summary
This problem demonstrates an important problem-solving technique: reframing the problem to see it from a different perspective. Instead of thinking about incrementing n-1 elements, we think about the relative differences between elements and the minimum element. The mathematical insight that all elements need to "catch up" to the same level leads to the elegant O(n) solution. This pattern of finding mathematical relationships appears frequently in array manipulation problems.
