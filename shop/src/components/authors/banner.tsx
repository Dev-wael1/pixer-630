import Image from '@/components/ui/image';
import placeholder from '@/assets/images/placeholders/product.svg';
import FollowButton from '@/components/follow/follow-button';

type BannerProps = {
  name: string;
  coverImage: string;
  logo: string;
  shopId: string;
};

const Banner: React.FC<BannerProps> = ({ name, coverImage, logo, shopId }) => {
  return (
    <div className="shopBanner relative w-full">
      <div className="absolute top-0 left-0 h-full w-full">
        <Image
          alt={name}
          fill
          className="object-cover"
          src={coverImage ?? placeholder}
        />
      </div>
      <div className="relative z-10 h-full w-full bg-white/[0.85] px-4 pt-10 pb-16 text-center backdrop-blur-sm dark:bg-dark/[0.85] lg:px-8 lg:pt-14 lg:pb-20">
        <div className="relative mx-auto h-[75px] w-[75px] md:h-20 md:w-20 2xl:h-[90px] 2xl:w-[90px] 3xl:h-[100px] 3xl:w-[100px]">
          <Image
            alt={name}
            fill
            className="object-cover"
            quality={100}
            src={logo ?? placeholder}
          />
        </div>
        <h1 className="mt-3 text-sm font-medium text-dark-100 dark:text-light lg:text-15px 2xl:mt-4">
          {name}
        </h1>
        <div className="mt-3.5 flex justify-center md:mt-4 lg:mt-5">
          <FollowButton shop_id={shopId} />
        </div>
      </div>
    </div>
  );
};

export default Banner;
