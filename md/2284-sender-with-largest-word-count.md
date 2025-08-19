### Leetcode 2284 (Medium): Sender With Largest Word Count [Practice](https://leetcode.com/problems/sender-with-largest-word-count)

### Description  
Given a chat log of n messages, you receive two string arrays: **messages** and **senders**.  
- **messages[i]** is the \(i^{th}\) message.
- **senders[i]** is the name of who sent the \(i^{th}\) message.

Find the sender with the largest total word count across all their messages.  
If multiple senders have the same highest word count, return the sender with the lexicographically largest name (where uppercase < lowercase, and "Alice" < "alice" < "bob").  
Words in each message are separated by a single space. All messages are well-formed (no leading/trailing spaces).

### Examples  

**Example 1:**  
Input:  
```
messages = ["Hello userTwooo", "Hi userThree", "Wonderful day Alice"],
senders = ["Alice", "Bob", "Alice"]
```
Output:  
```
"Alice"
```
Explanation:  
- "Alice" sent: "Hello userTwooo" (2 words) and "Wonderful day Alice" (3 words) ⇒ total 5 words  
- "Bob" sent: "Hi userThree" (2 words) ⇒ total 2 words  
Alice has the largest word count.

**Example 2:**  
Input:  
```
messages = ["How is leetcode for everyone", "Leetcode is useful for practice"],
senders = ["Bob", "Charlie"]
```
Output:  
```
"Charlie"
```
Explanation:  
- "Bob": "How is leetcode for everyone" (6 words) ⇒ total 6  
- "Charlie": "Leetcode is useful for practice" (5 words) ⇒ total 5  
Bob has more words, but if both had 6, the lexicographically largest would be chosen.

**Example 3:**  
Input:  
```
messages = ["word"], 
senders = ["a"]
```
Output:  
```
"a"
```
Explanation:  
Only one sender, the answer is "a".

### Thought Process (as if you’re the interviewee)  
Let's think step by step:
- First, for each message, count the number of words (number of spaces + 1).
- Maintain a dictionary mapping each sender's name to their total word count.
- Iterate through all messages and update the sender's word count accordingly.

Once done, search through the dictionary to find the sender(s) with the highest total.
- If there are ties (multiple senders with the same max count), select the lexicographically largest name by comparing the names.

Brute-force is feasible since we're just parsing and counting.  
This is efficient enough as all steps are linear in the input size.

Trade-offs:
- Optimal to keep all logic in a single loop for performance.
- Lexicographical tie-breaking adds minimal cost since it is just string comparison for a small number of candidates.

### Corner cases to consider  
- Empty messages or senders (input guaranteed as per the problem, but good to check for robustness).
- Multiple senders with exactly the same word count, check correct lexicographical return.
- Only one sender, multiple messages.
- Sender names that vary by case ("Alice" vs. "alice").
- Messages with one word only.

### Solution

```python
def largestWordCount(messages, senders):
    # Dictionary to hold word count per sender
    word_count = {}
    
    for i in range(len(messages)):
        # Count the number of words in the iᵗʰ message
        # (words = number of spaces + 1)
        count = messages[i].count(' ') + 1
        sender = senders[i]
        
        # Add to sender's total word count
        if sender in word_count:
            word_count[sender] += count
        else:
            word_count[sender] = count
    
    # Track highest word count and sender with that count
    max_count = -1
    res_sender = ""
    
    for sender in word_count:
        wc = word_count[sender]
        
        # If higher count, or equal count but name is lexicographically larger, update result
        if wc > max_count or (wc == max_count and sender > res_sender):
            max_count = wc
            res_sender = sender
    
    return res_sender
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × k), where n = number of messages and k = max message length.  
  - Each message involves counting spaces (O(k)).  
  - Building the dictionary is O(n).  
  - The final pass through senders is O(s) where s = unique sender count (s ≤ n).
- **Space Complexity:** O(s), where s = number of unique senders.  
  - Extra space is used for the word_count dictionary.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle if the messages array is huge and can't fit into memory?  
  *Hint: Can you process one message at a time and keep sender stats incrementally?*

- What if "messages" could have non-standard separators or malformed strings?  
  *Hint: Explore more robust word tokenization.*

- Could you return a list of all top senders in case of a tie, not just one?  
  *Hint: After building the word count, filter all with max count.*

### Summary
This problem uses classic **hash map accumulation** and a **post-processing max/min scan**.  
It’s a fundamental coding pattern for tally-and-select problems, often used in frequency counting, leaderboard tallying, log/stat analysis, or any "top-N ranking" question.  
The lexicographical check is a subtle requirement and highlights attention to output constraints.

### Tags
Array(#array), Hash Table(#hash-table), String(#string), Counting(#counting)

### Similar Problems
- Top K Frequent Elements(top-k-frequent-elements) (Medium)
- Top K Frequent Words(top-k-frequent-words) (Medium)