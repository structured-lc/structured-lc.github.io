### Leetcode 462 (Medium): Minimum Moves to Equal Array Elements II [Practice](https://leetcode.com/problems/minimum-moves-to-equal-array-elements-ii)

### Description  
Given an integer array nums of size n, return the minimum number of moves required to make all array elements equal. In one move, you can increment or decrement an element of the array by 1.

### Examples  

**Example 1:**  
Input: `nums = [1,2,3]`  
Output: `2`  
*Explanation: Only two moves are needed (remember each move increments or decrements one element):*
*[1,2,3] → [2,2,3] → [2,2,2]*

**Example 2:**  
Input: `nums = [1,10,2,9]`  
Output: `16`  
*Explanation: We need to make all elements equal to some target value. The optimal target is 5.5, but since we can only have integers, we choose either 5 or 6. Both give the same result: |1-5| + |10-5| + |2-5| + |9-5| = 4 + 5 + 3 + 4 = 16.*


### Thought Process (as if you're the interviewee)  
This is different from the first version because now we can both increment AND decrement elements, which gives us more flexibility.

**Key Insight:**
Since we can move elements both up and down, we want to find the optimal target value that minimizes the total distance (Manhattan distance) from all elements to that target.

**Mathematical Property:**
The value that minimizes the sum of absolute deviations is the median! This is a well-known property in statistics.

**Why Median?**
- If we choose any value less than the median, we can reduce total cost by moving towards the median
- If we choose any value greater than the median, we can reduce total cost by moving towards the median
- The median is the optimal choice

**Algorithm:**
1. Sort the array to find the median
2. Calculate the sum of absolute differences between each element and the median

**Edge Case - Even Length:**
For arrays with even length, any value between the two middle elements (inclusive) gives the same minimum cost. We can use either middle element.


### Corner cases to consider  
- Array with one element: Should return 0  
- All elements already equal: Should return 0  
- Array with two elements: Distance between them  
- Array with negative numbers: Algorithm works the same  


### Solution

```python
# Just like in interviews, please do not use python libraries to take shortcuts.
# They aren't usually allowed in real interviews.
# Add comments to each step of your logic

def minMoves2(nums):
    # Sort the array to find the median
    nums.sort()
    n = len(nums)
    
    # Find the median
    # For even length, we can use either middle element
    median = nums[n // 2]
    
    # Calculate total moves needed
    moves = 0
    for num in nums:
        moves += abs(num - median)
    
    return moves

```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n) due to sorting the array. The subsequent calculation of moves is O(n).
- **Space Complexity:** O(1) if we're allowed to modify the input array for sorting, or O(n) if we need to create a copy. The algorithm itself uses constant extra space.


### Potential follow-up questions (as if you're the interviewer)  

- Can you solve this without sorting the array?  
  *Hint: Use quickselect to find the median in O(n) average time, reducing overall complexity to O(n)*

- What if moves have different costs (e.g., increment costs 1, decrement costs 2)?  
  *Hint: This becomes a weighted median problem, requiring more complex optimization techniques*

- How would you solve this if the target must be one of the existing array elements?  
  *Hint: Try each element as a potential target and compute the cost, then take the minimum*

### Summary
This problem demonstrates the importance of understanding mathematical properties like the median minimizing absolute deviations. Unlike the first version of this problem, the ability to both increment and decrement elements makes the median the optimal target. This pattern appears in many optimization problems involving minimizing total distance or cost, such as facility location problems and data clustering. The key insight is recognizing when a problem reduces to finding the median.


### Flashcard
The minimum moves is the sum of absolute differences to the median, since the median minimizes total distance.

### Tags
Array(#array), Math(#math), Sorting(#sorting)

### Similar Problems
- Best Meeting Point(best-meeting-point) (Hard)
- Minimum Moves to Equal Array Elements(minimum-moves-to-equal-array-elements) (Medium)
- Minimum Operations to Make a Uni-Value Grid(minimum-operations-to-make-a-uni-value-grid) (Medium)
- Removing Minimum Number of Magic Beans(removing-minimum-number-of-magic-beans) (Medium)
- Minimum Cost to Make Array Equal(minimum-cost-to-make-array-equal) (Hard)
- Minimum Operations to Make All Array Elements Equal(minimum-operations-to-make-all-array-elements-equal) (Medium)
- Minimum Cost to Make Array Equalindromic(minimum-cost-to-make-array-equalindromic) (Medium)
- Minimum Operations to Make Subarray Elements Equal(minimum-operations-to-make-subarray-elements-equal) (Medium)
- Minimum Operations to Make Elements Within K Subarrays Equal(minimum-operations-to-make-elements-within-k-subarrays-equal) (Hard)