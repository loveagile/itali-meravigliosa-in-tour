import Link from "next/link"
import styled from "styled-components"
import Image from "next/image"



// CSS for Buy Me Coffee
const Button = styled.div`
  a {
    line-height: 2;
    height: 5rem;
    text-decoration: none;
    display: flex;
    color: #ffffff;
    align-items: center;
    background-color: #ff813f;
    border-radius: 5px;
    border: 1px solid transparent;
    padding: 0.7rem 1rem 0.7rem 1rem;
    font-size: 2rem;
    letter-spacing: 0.6px;
    box-shadow: 0px 1px 2px rgba(190, 190, 190, 0.5);
    transition: 0.3s all linear;
    font-family: cursive;
    display: block;
    &:hover,
    &:active,
    &:focus {
      text-decoration: none;
      box-shadow: 0px 1px 2px 2px rgba(190, 190, 190, 0.5);
      opacity: 0.85;
      color: #ffffff;
    }
    div {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      gap: 15px;
      .img {
        height: 34px;
        width: 35px;
        margin-bottom: 1px;
        box-shadow: none;
        border: none;
        vertical-align: middle;
      }
      span {
        font-size: 1.6rem;
      }
    }
  }
`



const BuyMeCoffee = (): JSX.Element => {
  return (
    <Button>
      <Link href="https://www.buymeacoffee.com/italiamera">
        <a target="_blank">
          <div>
            <Image
              src="/images/coffee-cap.svg"
              alt="Buy me a coffee"
              width={34}
              height={35}
              className="img"
            />
            <span>Buy me a coffee</span>
          </div>
        </a>
      </Link>
    </Button>
  )
}

export default BuyMeCoffee
