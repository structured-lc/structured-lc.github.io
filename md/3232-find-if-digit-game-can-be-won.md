### Leetcode 3232 (Easy): Find if Digit Game Can Be Won [Practice](https://leetcode.com/problems/find-if-digit-game-can-be-won)

### Description  
You are given an array of positive integers (`nums`). Two players, Alice and Bob, play a game:
- Alice chooses either all single-digit numbers (1–9) or all double-digit numbers (10–99) from `nums`.  
- Bob receives the remaining numbers.
- Alice wins if the sum of the numbers that she picked is strictly greater than the sum of Bob's numbers.
Determine if Alice can guarantee a win, assuming she picks optimally.

### Examples  

**Example 1:**  
Input: `nums = [4, 12, 22, 3]`  
Output: `True`  
*Explanation: Single-digits = [4, 3], sum = 7. Double-digits = [12, 22], sum = 34. Alice can pick double-digits and win (34 > 7).*

**Example 2:**  
Input: `nums = [8, 6, 2]`  
Output: `False`  
*Explanation: Only single-digit numbers, sum = 16. No double-digits to choose. Neither choice gives her a sum strictly greater than the other.*

**Example 3:**  
Input: `nums = [10, 5, 22, 6]`  
Output: `True`  
*Explanation: Single-digits = [5, 6], sum = 11. Double-digits = [10, 22], sum = 32. Alice picks double-digits and wins (32 > 11).*

### Thought Process (as if you’re the interviewee)  
- **Brute force:**  
  List all possible subsets. But that's infeasible—too many combinations.

- **Observation:**  
  Alice can only pick all single-digits OR all double-digits. Calculate the sum of each group:
  - Let `sum1` = sum of all single-digit numbers.
  - Let `sum2` = sum of all double-digit numbers.
  - The other player gets the remaining numbers (which are either sum2 or sum1).

- **Decision:**  
  Alice just picks the group with the larger sum if she can (since the chosen group can't tie—must be strictly greater). If sums are equal, Alice can't win; otherwise, she always can.
  
- **Final approach:**  
  Compute both sums. If they're not equal, Alice can win by picking the larger sum set.

### Corner cases to consider  
- Empty array (`nums = []`): Alice cannot win; both sums are 0.
- All single-digits, no double-digits: Alice cannot strictly win; sums are equal.
- All double-digits, no single-digits: Same as above.
- Array with only one element: impossible for Alice to win strictly.
- Sums entirely equal: Alice cannot win.

### Solution

```python
def findGameCanBeWon(nums):
    # Calculate the sum of all single-digit numbers (1 to 9)
    sum_single = 0
    sum_double = 0
    
    for num in nums:
        if 1 <= num <= 9:
            sum_single += num
        elif 10 <= num <= 99:
            sum_double += num
        # Numbers outside the range (shouldn't exist per problem) are ignored.
    
    # If the sums of both groups are not equal, Alice can always pick the group with the larger sum
    return sum_single != sum_double
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), since we iterate once through the nums array and perform constant work per iteration.
- **Space Complexity:** O(1), as we only use two integer accumulators for the sums regardless of input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if negative numbers are allowed in the input?  
  *Hint: How does this change which subset gives a higher sum?*

- How to generalize this for k-digit numbers?  
  *Hint: Add logic for summing numbers in any digit range.*

- What if Alice could choose any subset, instead of all single- or double-digits?  
  *Hint: This becomes a subset-sum problem. How do we decide which subset to pick?*

### Summary
This problem uses a **partitioning and summing** pattern, a variant of greedy selection where candidate groups are fixed by digit count and a winner is determined by comparing group sums. It's similar to array split, greedy choice, and set-difference problems, and tests group-based maximization for simple conditions. This approach is clean, O(n), and uses only constant space. Similar logic applies to grouping or partitioning scenarios with restrictive choices.


### Flashcard
Alice picks either all single-digit or all double-digit numbers—calculate both sums and choose the larger group.

### Tags
Array(#array), Math(#math)

### Similar Problems
- Find Numbers with Even Number of Digits(find-numbers-with-even-number-of-digits) (Easy)
- Count Integers With Even Digit Sum(count-integers-with-even-digit-sum) (Easy)