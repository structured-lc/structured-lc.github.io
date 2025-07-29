### Leetcode 1423 (Medium): Maximum Points You Can Obtain from Cards [Practice](https://leetcode.com/problems/maximum-points-you-can-obtain-from-cards)

### Description  
You are given a row of cards, each with a certain point value in the array `cardPoints`. You can take cards only from either end (the beginning or the end) of the row, and you must pick exactly `k` cards in total. The goal is to find the maximum score you can obtain by picking `k` cards this way.

### Examples  

**Example 1:**  
Input: `cardPoints = [1,2,3,4,5,6,1]`, `k = 3`  
Output: `12`  
*Explanation: The optimal strategy is to take the last 3 cards (5,6,1), giving you a total score of 12. You could also try other combinations, but none gives a higher total.*

**Example 2:**  
Input: `cardPoints = [2,2,2]`, `k = 2`  
Output: `4`  
*Explanation: You can only make pairs (2,2) from either side, so the maximum score is 4.*

**Example 3:**  
Input: `cardPoints = [9,7,7,9,7,7,9]`, `k = 7`  
Output: `55`  
*Explanation: You have to take all the cards. The sum is 55.*

### Thought Process (as if you’re the interviewee)  
The brute-force approach is to try all possible combinations of picking k cards from left and right (pick i from left, rest from right for all 0 ≤ i ≤ k), and take the one with the max sum. But this is O(k) for each combination and could be slow for large k.

We can optimize using a sliding window. Instead of picking k cards from the two ends, notice that among n cards, you leave n-k continuous cards somewhere in the middle. That means, maximizing the sum of k picked cards equals minimizing the sum of any single continuous chunk of n-k cards in the middle. So, sum the full array, then subtract the minimum sum of a subarray of size n-k.

Alternatively, start by taking all k cards from the front, then in each step, swap one card from the end for one from the front, and keep track of the best sum seen.

Both approaches yield the same time complexity: O(n), and constant space (if not counting input).

### Corner cases to consider  
- k == 0 (should return 0)  
- k == len(cardPoints) (take all cards, just sum all)  
- cardPoints has all equal values  
- cardPoints has negative numbers (if allowed by problem statement)  
- k > len(cardPoints) (invalid, based on constraints)  
- Single card: k == 1, len(cardPoints) == 1

### Solution

```python
# Sliding window: maximize sum from picking k cards from ends

def maxScore(cardPoints, k):
    n = len(cardPoints)
    total = sum(cardPoints)
    if k == n:
        return total
    # Compute minimum sum of subarray of size n - k
    window = n - k
    curr_sum = sum(cardPoints[:window])
    min_sum = curr_sum
    for i in range(window, n):
        curr_sum += cardPoints[i] - cardPoints[i - window]
        min_sum = min(min_sum, curr_sum)
    return total - min_sum
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n). One full pass to sum all elements, one pass for the sliding window to find the minimum sum subarray of size n - k.
- **Space Complexity:** O(1) extra space (not counting input), since we're using variables for sums and window.


### Potential follow-up questions (as if you’re the interviewer)  

- What if you could pick fewer than k cards (i.e., ≤ k)?  
  *Hint: You'd have to try all combinations for 0 ≤ taken ≤ k, possibly greedily.*

- What if instead of one row, cards are in a ring or cycle?  
  *Hint: Consider using a sliding window on a doubled array.*

- What if some cards have negative values?  
  *Hint: The solution still works even if some are negative, but check if always picking k is optimal.*

### Summary
This problem is a classic example of the sliding window pattern. Instead of checking every pick at both ends, we model the picking process as leaving a window of n-k cards unpicked. By finding the minimal sum of n-k consecutive cards to leave behind, we can determine the maximal score efficiently. The technique applies to other "pick-from ends" problems as well, especially those that reduce to an exclusion window.