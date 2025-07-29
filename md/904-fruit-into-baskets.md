### Leetcode 904 (Medium): Fruit Into Baskets [Practice](https://leetcode.com/problems/fruit-into-baskets)

### Description  
You're given an integer array `fruits` representing a row of fruit trees, where each element is the type of fruit each tree has. You have two baskets, and each basket can only contain one type of fruit. 
Starting from any tree, you must pick exactly one fruit from each tree in a row moving to the right, and can only continue picking as long as the fruit fits in one of your baskets (i.e., contains at most 2 types).  
The goal is to find the length of the longest contiguous subarray (segment) containing at most 2 distinct fruit types—the max number of fruits you can pick while following these rules.

### Examples  

**Example 1:**  
Input: `fruits = [1,2,1]`  
Output: `3`  
*Explanation: Pick all the trees, as you only have two types (1 and 2).*

**Example 2:**  
Input: `fruits = [0,1,2,2]`  
Output: `3`  
*Explanation: Pick trees with types [1,2,2] (indices 1,2,3).*

**Example 3:**  
Input: `fruits = [1,2,3,2,2]`  
Output: `4`  
*Explanation: Pick [2,3,2,2] (start at index 1), the baskets will hold types 2 and 3.*

**Example 4:**  
Input: `fruits = [3,3,3,1,2,1,1,2,3,3,4]`  
Output: `5`  
*Explanation: The longest subarray is [1,2,1,1,2] (types 1 and 2).*

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
  Try every subarray and check if it contains at most 2 types of fruits, and track the max length. This is O(n²), too slow for large n.

- **Optimized approach:**  
  Recognize that we want the longest *contiguous* segment with at most 2 types → classic **sliding window** pattern.  
  Use two pointers (`left`, `right`).  
  - Expand `right` to include new fruits until you have more than 2 types.  
  - When over limit, move `left` rightward until the window is valid again (≤2 types).
  - Track fruit types and their counts using a dictionary/hashmap.
  - Update the max window size as you scan.

- **Why this is efficient:**  
  Each fruit type is added and removed at most once; edges of the window only move forward, making this O(n).

### Corner cases to consider  
- Empty array → output 0  
- Array with just 1 or 2 types (all same, or only two kinds)
- All elements distinct  
- Baskets switching types frequently (switch every element)
- Long runs of repeated elements

### Solution

```python
def totalFruit(fruits):
    # Dictionary to track the count of each fruit type in the window
    count = {}
    left = 0
    max_fruits = 0

    for right in range(len(fruits)):
        # Add current fruit to count
        fruit = fruits[right]
        count[fruit] = count.get(fruit, 0) + 1

        # If more than 2 types, shrink window from the left
        while len(count) > 2:
            left_fruit = fruits[left]
            count[left_fruit] -= 1
            if count[left_fruit] == 0:
                del count[left_fruit]
            left += 1

        # Update max_fruits with the size of current valid window
        window_size = right - left + 1
        if window_size > max_fruits:
            max_fruits = window_size

    return max_fruits
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the number of trees (length of `fruits`).  
  Each pointer (left/right) only moves forward through the array, and each fruit is inserted/removed from the dictionary at most once.
- **Space Complexity:** O(1), because the dictionary will contain at most 2 types of fruits at any time.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you had **K** baskets instead of 2?  
  *Hint: Generalize the code to maintain at most K keys in the dictionary.*

- Can you output the actual **subarray** or the **starting index** instead of just the maximum count?  
  *Hint: Track `left` and `right` pointers when updating the `max_fruits`.*

- What if fruits are coming as a **stream**? Can you still solve it on the fly?  
  *Hint: Only keep necessary info in your sliding window mapping for dynamic processing.*

### Summary
This is a classic **sliding window** problem, often called "Longest Substring with At Most 2 Distinct Characters" adapted for numbers.  
The pattern can be generalized for "at most K distinct elements in a subarray/string".  
Sliding window + hashmap is widely applicable in substring, subarray, and streaming window-type questions.