### Leetcode 2288 (Medium): Apply Discount to Prices [Practice](https://leetcode.com/problems/apply-discount-to-prices)

### Description  
Given a string called `sentence` containing space-separated words, some words may represent a price (i.e., start with '$' and are followed only by digits, e.g., "$100").  
You are also given an integer `discount` (0 ≤ discount ≤ 100).  
For each price word, apply the discount (i.e., reduce the price by discount%) and replace it in the sentence with the discounted price, keeping exactly two decimal places.  
Return the modified sentence.

A price word must:  
- Start with a '$'
- The part after '$' must be digits only (no letters, no decimal points, no negative sign)
- "$" alone or "$abc" or "$1e3" do NOT count as prices

### Examples  

**Example 1:**  
Input: `sentence = "there are $100 and $200 here", discount = 20`  
Output: `"there are $80.00 and $160.00 here"`  
*Explanation: "$100" → $100 × (1 - 20/100) = $80.00, "$200" → $160.00. The sentence is updated accordingly.*

**Example 2:**  
Input: `sentence = "nothing to price here", discount = 50`  
Output: `"nothing to price here"`  
*Explanation: No prices in the sentence, so no change.*

**Example 3:**  
Input: `sentence = "save $2 $3 $4", discount = 50`  
Output: `"save $1.00 $1.50 $2.00"`  
*Explanation: "$2" → $1.00, "$3" → $1.50, "$4" → $2.00 after applying 50% discount.*

### Thought Process (as if you’re the interviewee)  
Start by splitting the sentence by spaces to get individual words.  
For each word, check:
- Does it start with '$'?
- Is the rest of it (after the '$') entirely digits?

If yes, parse that number, compute discounted value:  
discounted = original × (1 - discount/100)  
Format it to two decimal places and prepend '$' back.

Add this modified word to a result list; else, keep the word as is.

Finally, join the words back into a string.

This approach is optimal because:
- We visit each word once (O(n), where n is the number of characters)
- No unnecessary regex or library shortcuts

Trade-offs:
- This method is robust and readable
- No extra libraries, so it's suitable for real-world interviews

### Corner cases to consider  
- Sentence has no price words  
- Price word is "$" alone (should not count as a price)  
- Price word with letters (e.g. "$1a")  
- Price word with non-digit after '$' ("$3.5", "$-10")  
- Multiple and consecutive price words  
- Long numbers, check up to 10 digits  
- Discount = 0 or 100  
- Single word sentence  
- Leading/trailing/multiple spaces (you can assume input is spaced correctly per problem statement)

### Solution

```python
def discountPrices(sentence: str, discount: int) -> str:
    # Calculate the multiplier based on discount percentage
    multiplier = (100 - discount) / 100

    words = sentence.split(' ')
    result = []

    for word in words:
        # Check if the word qualifies as a price:
        # Starts with '$' and has digits after it (no empty, no non-digit)
        if word.startswith('$') and len(word) > 1 and word[1:].isdigit():
            # Parse the price value
            price = int(word[1:])
            # Apply the discount
            discounted_price = price * multiplier
            # Format with exactly two decimal digits
            discounted_str = f"${discounted_price:.2f}"
            result.append(discounted_str)
        else:
            # Keep unchanged
            result.append(word)

    # Join all words back into a sentence
    return ' '.join(result)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the length of the sentence. Each word is checked once, simple operations per word.
- **Space Complexity:** O(n), where n is length of the output sentence (holding all updated words in a list).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle prices with decimals, e.g., "$100.25"?  
  *Hint: You'd need to change the digit-check to allow for a single period, then parse as float.*

- Can you handle input sentences with extra/multiple consecutive spaces?  
  *Hint: Use .split() and .join() carefully, or consider using regular expressions for splitting.*

- What if the sentence is very large (millions of characters)?  
  *Hint: Streaming or in-place updates, avoid splitting the entire sentence into a list.*

### Summary
This problem demonstrates classic **string parsing and simulation**: Split, validate, compute, format, and join.  
Key aspects include robust word validation, safe numerical operations, and precision formatting— 
skills common in parsing, data munging, and text-processing tasks. This pattern is widely useful for problems requiring conditional transformation of words or phrases within a larger text.