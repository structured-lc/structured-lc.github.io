### Leetcode 1689 (Medium): Partitioning Into Minimum Number Of Deci-Binary Numbers [Practice](https://leetcode.com/problems/partitioning-into-minimum-number-of-deci-binary-numbers)

### Description  
You are given a large **string n** representing a decimal number. A deci-binary number is a number comprising only '0' or '1' digits (no 2-9). You need to partition n into the smallest number of deci-binary numbers such that their sum equals n. Return the *minimum* number of deci-binary numbers needed to sum up to n.

### Examples  

**Example 1:**  
Input: `n = "32"`  
Output: `3`  
*Explanation: The smallest answer is 3. Three deci-binary numbers: 11 + 11 + 10 = 32.*

**Example 2:**  
Input: `n = "82734"`  
Output: `8`  
*Explanation: The minimum needed is 8, e.g. 11111 + 11111 + 11111 + 11111 + 11110 + 11110 + 10100 + 10100 = 82734.*

**Example 3:**  
Input: `n = "27346209830709182346"`  
Output: `9`  
*Explanation: The largest digit is 9, so we need at least 9 deci-binary numbers.*

### Thought Process (as if you’re the interviewee)  
Start by thinking: Each deci-binary number can contribute at most 1 in any digit position, meaning to create a digit d you need d deci-binary numbers. So, for each column in n, the minimal number of deci-binary numbers needed is the largest digit found anywhere in n. The answer is, therefore, just the max digit in n.

### Corner cases to consider  
- All digits are '1': Only need 1 deci-binary number.
- n contains 0's: 0's don't affect the count, since you never need to create more than the maximal digit.
- Very long strings.

### Solution

```python
# Find the minimum number of deci-binary numbers whose sum is n

def minPartitions(n: str) -> int:
    # The answer is the largest single digit in n
    return max(int(d) for d in n)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(len(n)) — Need to check each digit once.
- **Space Complexity:** O(1) — Only one integer stored for the answer.


### Potential follow-up questions (as if you’re the interviewer)  

- Could you output the actual deci-binary numbers used in the partition?  
  *Hint: Try constructing them column by column.*

- If you were allowed digits up to k (k-binary), how would the solution change?  
  *Hint: Would depend on the maximal digit.*

- What if the number is in base b, not decimal?  
  *Hint: What does a 'deci-binary' mean in another base?*

### Summary
This problem is a greedy digit selection: answer is just the maximum digit in the string. It's a good example of digit-based greedy choices, a pattern that recurs in other "partition to minimal components by position" problems.