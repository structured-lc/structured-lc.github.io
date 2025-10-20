### Leetcode 670 (Medium): Maximum Swap [Practice](https://leetcode.com/problems/maximum-swap)

### Description  
Given a non-negative integer **num**, you may swap any two digits *at most once*, and aim to return the largest number possible after this single swap. If the number is already maximized or swapping doesn't help, return the original number.  
Explain: Given *one* swap (or none), what's the largest integer you can make by reordering the digits of num (using only that one swap)?

### Examples  

**Example 1:**  
Input: `2736`  
Output: `7236`  
*Explanation:  
- digits: [2, 7, 3, 6]  
- The best move is to swap '2' (index 0) with '7' (index 1), resulting in 7236, which is the largest possible in one swap.*

**Example 2:**  
Input: `9973`  
Output: `9973`  
*Explanation:  
- digits: [9, 9, 7, 3]  
- The number is already the largest combination; any swap will not increase the value.*

**Example 3:**  
Input: `0`  
Output: `0`  
*Explanation:  
- Only one digit, so swapping has no effect.*

### Thought Process (as if you’re the interviewee)  
- **Brute Force:** Try all possible pairs of swaps, check the number resulting from each swap, keep the largest.  
  - This would be O(n²) where n is the number of digits.
  - Not efficient for large numbers (up to 10⁸).

- **Greedy + Map:**  
  - Idea: To maximize, try to bring the largest possible digit forward to the earliest possible position.
  - Traverse the number, for each digit, look to the *right* for the largest digit greater than the current one.
  - If you find such a digit, swap it with the current one, and you're done (since the most significant digits matter most).
  - For efficiency: Store the last occurrence of each digit.
  - Iterate from left to right, for each digit, check for a larger digit from 9 downto curr+1, and see if it occurs later.
  - This results in a linear O(n) scan.

- **Why this Greedy approach?**
  - Only one swap allowed, so you want the maximal benefit (at the most significant place).
  - Storing indexes helps to directly look up if and where a higher digit can be swapped in.

### Corner cases to consider  
- Number is already the largest permutation (e.g., 9876, 9973).
- Number is of single digit (e.g., 0, 5).
- All digits are the same (e.g., 1111).
- Swapping produces a leading zero (e.g., 109).
- Correctly handling swaps with equal digits later (e.g., 1993).
- Numbers with zeros in them (e.g., 907, 2701).

### Solution

```python
def maximumSwap(num: int) -> int:
    # Convert the number to a list of its digits (as integers)
    digits = [int(d) for d in str(num)]
    
    # Record the last position of each digit (0-9)
    last = {int(d): i for i, d in enumerate(str(num))}
    
    # Iterate each digit starting from the left (most significant)
    for i, d in enumerate(digits):
        # Try all possible higher digits in descending order
        for higher in range(9, d, -1):
            # If a higher digit exists later, swap!
            if last.get(higher, -1) > i:
                # Swap: bring the higher digit forward
                j = last[higher]
                digits[i], digits[j] = digits[j], digits[i]
                # Only one swap allowed -- return result
                return int(''.join(map(str, digits)))
    return num  # No beneficial swap found
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)
  - n is the length of the number (number of digits).
  - Each digit is checked at most 9 times (digits 9 downto d+1).
  - Constructing 'last' mapping takes O(n).
- **Space Complexity:** O(n)
  - For storing the digits and the 'last' mapping.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you could make *k* swaps instead of just one?  
  *Hint: Consider the greedy approach as for the largest number; think about recursive backtracking or using a heap for k swaps.*

- How would you generate all possible numbers using swaps and find the kᵗʰ largest one?  
  *Hint: Explore permutations and perhaps use BFS/DFS for generating unique swapped numbers.*

- What if you needed both the maximum and minimum numbers with one swap?  
  *Hint: The logic is similar, but now you try to bring in the smallest possible digit to the front, taking care of leading zeros.*

### Summary
This is a classic *greedy* digit-swapping problem, emphasizing largest-possible rearrangement with *one* operation. The efficient solution uses digit position mapping for O(n) performance. This technique of using last occurrence maps is widely applicable in string/digit manipulation to solve "maximize/minimize by one change" interview problems. The approach can also be extended for k swaps or different optimization criteria.


### Flashcard
For each digit, find the largest digit to its right and swap for maximal value; greedy approach ensures only one swap is needed.

### Tags
Math(#math), Greedy(#greedy)

### Similar Problems
- Create Maximum Number(create-maximum-number) (Hard)